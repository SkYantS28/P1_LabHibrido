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
  addresses: Address[];
  selectedAddress: Address | null;
  selectAddress: (address: Address) => Promise<void>;
  addAddress: (
    title: string,
    address: string,
    neighborhood: string
  ) => Promise<boolean>;
  updateAddress: (
    id: string,
    title: string,
    address: string,
    neighborhood: string
  ) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
};

const AddressContext = createContext<AddressContextData | undefined>(
  undefined
);

const ADDRESSES_STORAGE_KEY = "@veneto_addresses";
const SELECTED_ADDRESS_STORAGE_KEY = "@veneto_selected_address";

const defaultAddresses: Address[] = [
  {
    id: "1",
    title: "Casa",
    address: "Rua Exemplo, 123",
    neighborhood: "Centro",
  },
  {
    id: "2",
    title: "Trabalho",
    address: "Av. Principal, 456",
    neighborhood: "Centro",
  },
];

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] =
    useState<Address[]>(defaultAddresses);

  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem(
          ADDRESSES_STORAGE_KEY
        );

        const storedSelectedAddress =
          await AsyncStorage.getItem(
            SELECTED_ADDRESS_STORAGE_KEY
          );

        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        } else {
          await AsyncStorage.setItem(
            ADDRESSES_STORAGE_KEY,
            JSON.stringify(defaultAddresses)
          );
        }

        if (storedSelectedAddress) {
          setSelectedAddress(
            JSON.parse(storedSelectedAddress)
          );
        }
      } catch (error) {
        console.log(
          "Erro ao carregar dados de endereço:",
          error
        );
      }
    };

    loadAddressData();
  }, []);

  const selectAddress = async (address: Address) => {
    try {
      await AsyncStorage.setItem(
        SELECTED_ADDRESS_STORAGE_KEY,
        JSON.stringify(address)
      );

      setSelectedAddress(address);
    } catch (error) {
      console.log(
        "Erro ao salvar endereço selecionado:",
        error
      );
    }
  };

  const addAddress = async (
    title: string,
    address: string,
    neighborhood: string
  ) => {
    const normalizedTitle = title.trim();
    const normalizedAddress = address.trim();
    const normalizedNeighborhood = neighborhood.trim();

    if (
      !normalizedTitle ||
      !normalizedAddress ||
      !normalizedNeighborhood
    ) {
      return false;
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      title: normalizedTitle,
      address: normalizedAddress,
      neighborhood: normalizedNeighborhood,
    };

    const updatedAddresses = [
      ...addresses,
      newAddress,
    ];

    try {
      await AsyncStorage.setItem(
        ADDRESSES_STORAGE_KEY,
        JSON.stringify(updatedAddresses)
      );

      setAddresses(updatedAddresses);

      return true;
    } catch (error) {
      console.log("Erro ao adicionar endereço:", error);
      return false;
    }
  };

  const updateAddress = async (
    id: string,
    title: string,
    address: string,
    neighborhood: string
  ) => {
    const normalizedTitle = title.trim();
    const normalizedAddress = address.trim();
    const normalizedNeighborhood = neighborhood.trim();

    if (
      !normalizedTitle ||
      !normalizedAddress ||
      !normalizedNeighborhood
    ) {
      return false;
    }

    const updatedAddresses = addresses.map((item) =>
      item.id === id
        ? {
            ...item,
            title: normalizedTitle,
            address: normalizedAddress,
            neighborhood: normalizedNeighborhood,
          }
        : item
    );

    const updatedAddress = updatedAddresses.find(
      (item) => item.id === id
    );

    if (!updatedAddress) {
      return false;
    }

    try {
      await AsyncStorage.setItem(
        ADDRESSES_STORAGE_KEY,
        JSON.stringify(updatedAddresses)
      );

      setAddresses(updatedAddresses);

      if (selectedAddress?.id === id) {
        await AsyncStorage.setItem(
          SELECTED_ADDRESS_STORAGE_KEY,
          JSON.stringify(updatedAddress)
        );

        setSelectedAddress(updatedAddress);
      }

      return true;
    } catch (error) {
      console.log("Erro ao editar endereço:", error);
      return false;
    }
  };

  const deleteAddress = async (id: string) => {
    const updatedAddresses = addresses.filter(
      (item) => item.id !== id
    );

    if (updatedAddresses.length === addresses.length) {
      return false;
    }

    try {
      await AsyncStorage.setItem(
        ADDRESSES_STORAGE_KEY,
        JSON.stringify(updatedAddresses)
      );

      setAddresses(updatedAddresses);

      if (selectedAddress?.id === id) {
        await AsyncStorage.removeItem(
          SELECTED_ADDRESS_STORAGE_KEY
        );

        setSelectedAddress(null);
      }

      return true;
    } catch (error) {
      console.log("Erro ao excluir endereço:", error);
      return false;
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        selectAddress,
        addAddress,
        updateAddress,
        deleteAddress,
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
