import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";

export default function RootLayout() {
  return (
    <AddressProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </CartProvider>
    </AddressProvider>
  );
}
