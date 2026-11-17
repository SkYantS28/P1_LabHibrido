import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(buscar: () => Promise<T>) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      setDados(await buscar());
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [buscar]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { dados, loading, erro, recarregar: carregar };
}