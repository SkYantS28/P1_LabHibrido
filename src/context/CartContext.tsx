import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartItem = {
  id: string;
  name: string;
  description: string;
  size: string;
  border: string;
  observation: string;
  price: number;
  quantity: number;
};

type CartContextData = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextData | undefined>(
  undefined
);

const CART_STORAGE_KEY = "@veneto_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(
          CART_STORAGE_KEY
        );

        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.log("Erro ao carregar carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(items)
        );
      } catch (error) {
        console.log("Erro ao salvar carrinho:", error);
      }
    };

    saveCart();
  }, [items, loading]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (current) => current.id === item.id
      );

      if (existingItem) {
        return currentItems.map((current) =>
          current.id === item.id
            ? {
                ...current,
                quantity: current.quantity + 1,
              }
            : current
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser usado dentro de CartProvider"
    );
  }

  return context;
}
