import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
};

type OrdersContextData = {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => Promise<void>;
};

const OrdersContext = createContext<OrdersContextData | undefined>(
  undefined
);

const ORDERS_STORAGE_KEY = "@veneto_orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem(
          ORDERS_STORAGE_KEY
        );

        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.log("Erro ao carregar pedidos:", error);
      }
    };

    loadOrders();
  }, []);

  const addOrder = async (
    order: Omit<Order, "id" | "date">
  ) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toLocaleString("pt-BR"),
    };

    const updatedOrders = [newOrder, ...orders];

    try {
      await AsyncStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(updatedOrders)
      );

      setOrders(updatedOrders);
    } catch (error) {
      console.log("Erro ao salvar pedido:", error);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error(
      "useOrders deve ser usado dentro de OrdersProvider"
    );
  }

  return context;
}
