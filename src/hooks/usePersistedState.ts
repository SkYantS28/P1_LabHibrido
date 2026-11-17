import { useCallback, useEffect, useState } from "react";
import { storage } from "../services/storage";

export function usePersistedState<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(inicial);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let ativo = true;

    storage
      .get<T>(chave, inicial)
      .then((lido) => {
        if (ativo) setValor(lido);
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
      storage.set(chave, novo).catch(() => {});
    },
    [chave]
  );

  return [valor, atualizar, pronto] as const;
}