import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  );
}
