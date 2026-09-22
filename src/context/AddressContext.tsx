import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Address = {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
};

type AddressContextData = {
  selectedAddress: Address | null;
  selectAddress: (address: Address) => Promise<void>;
};

const AddressContext = createContext<AddressContextData | undefined>(
  undefined
);

const ADDRESS_STORAGE_KEY = "@veneto_selected_address";

export function AddressProvider({ children }: { children: ReactNode }) {
  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem(
          ADDRESS_STORAGE_KEY
        );

        if (storedAddress) {
          setSelectedAddress(JSON.parse(storedAddress));
        }
      } catch (error) {
        console.log("Erro ao carregar endereço:", error);
      }
    };

    loadAddress();
  }, []);

  const selectAddress = async (address: Address) => {
    try {
      await AsyncStorage.setItem(
        ADDRESS_STORAGE_KEY,
        JSON.stringify(address)
      );

      setSelectedAddress(address);
    } catch (error) {
      console.log("Erro ao salvar endereço:", error);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error(
      "useAddress deve ser usado dentro de AddressProvider"
    );
  }

  return context;
}
