import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function usePersistedState<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(inicial);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let ativo = true;

    AsyncStorage.getItem(chave)
      .then((bruto) => {
        if (!ativo) return;
        if (bruto !== null) {
          try {
            setValor(JSON.parse(bruto) as T);
          } catch {
            // dado corrompido: mantém o valor inicial
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (ativo) setPronto(true);
      });

    return () => {
      ativo = false;
    };
  }, [chave]);

  const atualizar = useCallback(
    (novo: T) => {
      setValor(novo);
      AsyncStorage.setItem(chave, JSON.stringify(novo)).catch(() => {});
    },
    [chave]
  );

  return [valor, atualizar, pronto] as const;
}