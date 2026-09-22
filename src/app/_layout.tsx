import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";
import { AuthProvider } from "../context/AuthContext";
import { OrdersProvider } from "../context/OrdersContext";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          <OrdersProvider>
            <FavoritesProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </FavoritesProvider>
          </OrdersProvider>
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  );
}
