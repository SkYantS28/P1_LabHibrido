import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";
import { AuthProvider } from "../context/AuthContext";
import { OrdersProvider } from "../context/OrdersContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </AuthProvider>
  );
}