import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  user: Omit<User, "password"> | null;
  login: (email: string, password: string) => boolean;
  register: (
    name: string,
    email: string,
    password: string
  ) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [registeredUser, setRegisteredUser] = useState<User | null>(
    null
  );

  const [user, setUser] = useState<Omit<User, "password"> | null>(
    null
  );

  const register = (
    name: string,
    email: string,
    password: string
  ) => {
    if (!name || !email || !password) {
      return false;
    }

    setRegisteredUser({
      name,
      email,
      password,
    });

    return true;
  };

  const login = (email: string, password: string) => {
    if (!registeredUser) {
      return false;
    }

    if (
      email !== registeredUser.email ||
      password !== registeredUser.password
    ) {
      return false;
    }

    setUser({
      name: registeredUser.name,
      email: registeredUser.email,
    });

    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
