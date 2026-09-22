import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  user: Omit<User, "password"> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

const USERS_STORAGE_KEY = "@veneto_users";
const CURRENT_USER_STORAGE_KEY = "@veneto_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [user, setUser] = useState<Omit<User, "password"> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem(
          USERS_STORAGE_KEY
        );

        const storedCurrentUser = await AsyncStorage.getItem(
          CURRENT_USER_STORAGE_KEY
        );

        if (storedUsers) {
          setRegisteredUsers(JSON.parse(storedUsers));
        }

        if (storedCurrentUser) {
          setUser(JSON.parse(storedCurrentUser));
        }
      } catch (error) {
        console.log("Erro ao carregar dados de autenticação:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password) {
      return false;
    }

    const emailAlreadyExists = registeredUsers.some(
      (registeredUser) =>
        registeredUser.email.toLowerCase() === normalizedEmail
    );

    if (emailAlreadyExists) {
      return false;
    }

    const newUser: User = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    const updatedUsers = [...registeredUsers, newUser];

    try {
      await AsyncStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(updatedUsers)
      );

      setRegisteredUsers(updatedUsers);

      return true;
    } catch (error) {
      console.log("Erro ao salvar usuário:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = registeredUsers.find(
      (registeredUser) =>
        registeredUser.email.toLowerCase() === normalizedEmail &&
        registeredUser.password === password
    );

    if (!foundUser) {
      return false;
    }

    const loggedUser = {
      name: foundUser.name,
      email: foundUser.email,
    };

    try {
      await AsyncStorage.setItem(
        CURRENT_USER_STORAGE_KEY,
        JSON.stringify(loggedUser)
      );

      setUser(loggedUser);

      return true;
    } catch (error) {
      console.log("Erro ao salvar sessão:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.log("Erro ao sair da conta:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider"
    );
  }

  return context;
}
