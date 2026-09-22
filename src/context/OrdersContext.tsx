import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

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
  addOrder: (order: Omit<Order, "id" | "date">) => void;
};

const OrdersContext = createContext<OrdersContextData | undefined>(
  undefined
);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toLocaleString("pt-BR"),
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);
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
