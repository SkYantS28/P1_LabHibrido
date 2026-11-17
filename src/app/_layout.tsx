import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { OrdersProvider } from "../context/OrdersContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ThemeProvider } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function Navegacao() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    SplashScreen.hideAsync();

    if (!user) {
      router.replace("/login");
    }
  }, [loading, user]);

  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AddressProvider>
          <CartProvider>
            <OrdersProvider>
              <FavoritesProvider>
                <Navegacao />
              </FavoritesProvider>
            </OrdersProvider>
          </CartProvider>
        </AddressProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}