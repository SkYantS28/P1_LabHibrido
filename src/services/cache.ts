import { storage } from "./storage";

type Entrada<T> = { dados: T; salvoEm: number };

export async function comCache<T>(
  chave: string,
  buscar: () => Promise<T>,
  ttlMs = 5 * 60_000
): Promise<T> {
  const guardado = await storage.get<Entrada<T> | null>(chave, null);
  const fresco = guardado && Date.now() - guardado.salvoEm < ttlMs;

  if (fresco) {
    return guardado!.dados;
  }

  try {
    const dados = await buscar();
    await storage.set(chave, { dados, salvoEm: Date.now() });
    return dados;
  } catch (e) {
    if (guardado) {
      return guardado.dados;
    }
    throw e;
  }
}