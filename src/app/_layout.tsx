import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";
import { AuthProvider } from "../context/AuthContext";
import { OrdersProvider } from "../context/OrdersContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          <OrdersProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </OrdersProvider>
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  );
}
