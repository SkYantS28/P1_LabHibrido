import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import {
  saveToken,
  getToken,
  removeToken,
  saveCache,
  getCache,
} from "../services/storage";

type User = {
  name: string;
  email: string;
};

type RegisterResult = "success" | "duplicate" | "error";

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<RegisterResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const USER_CACHE_KEY = "@veneto_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await getToken();
        const cachedUser = await getCache<User>(USER_CACHE_KEY);

        if (token && cachedUser) {
          setUser(cachedUser);
        }
      } catch (error) {
        console.log("Erro ao carregar sessão:", error);
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
  ): Promise<RegisterResult> => {
    try {
      await api.cadastrar(name, email, password);
      return "success";
    } catch (error: any) {
      if (error.message?.includes("já cadastrado")) {
        return "duplicate";
      }
      console.log("Erro ao cadastrar:", error);
      return "error";
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { token, usuario } = await api.login(email, password);

      const loggedUser: User = {
        name: usuario.nome,
        email: usuario.email,
      };

      await saveToken(token);
      await saveCache(USER_CACHE_KEY, loggedUser);

      setUser(loggedUser);
      return true;
    } catch (error: any) {
      const msg = String(error?.message ?? "");

      if (
        msg.includes("fetch failed") ||
        msg.includes("Network request failed") ||
        msg.includes("Failed to connect")
      ) {
        throw new Error("Não foi possível conectar ao servidor");
      }

      console.log("Erro ao fazer login:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      await saveCache(USER_CACHE_KEY, null);
      setUser(null);
    } catch (error) {
      console.log("Erro ao sair da conta:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}