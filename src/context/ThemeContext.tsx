import { createContext, ReactNode, useContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

type Modo = "claro" | "escuro";

type ThemeContextData = {
  modo: Modo;
  setModo: (modo: Modo) => void;
  pronto: boolean;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [modo, setModo, pronto] = usePersistedState<Modo>("app:tema", "claro");

  return (
    <ThemeContext.Provider value={{ modo, setModo, pronto }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTema deve ser usado dentro de ThemeProvider");
  }
  return ctx;
}