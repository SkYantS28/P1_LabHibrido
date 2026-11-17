import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "veneto_token";

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function saveCache<T>(key: string, data: T) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getCache<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}


export const storage = {
  async get<T>(chave: string, padrao: T): Promise<T> {
    try {
      const bruto = await AsyncStorage.getItem(chave);
      return bruto !== null ? (JSON.parse(bruto) as T) : padrao;
    } catch {
      return padrao;
    }
  },
  async set<T>(chave: string, valor: T) {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  },
  remove: (chave: string) => AsyncStorage.removeItem(chave),
};