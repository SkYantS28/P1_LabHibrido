import { createContext, ReactNode, useContext, useState } from "react";

export type Address = {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
};

type AddressContextData = {
  selectedAddress: Address | null;
  selectAddress: (address: Address) => void;
};

const AddressContext = createContext<AddressContextData | undefined>(
  undefined
);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const selectAddress = (address: Address) => {
    setSelectedAddress(address);
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
    throw new Error("useAddress deve ser usado dentro de AddressProvider");
  }

  return context;
}
