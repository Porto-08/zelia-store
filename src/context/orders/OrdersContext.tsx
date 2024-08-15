import { Order, OrderStatus } from "@/app/orders/type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getOrders } from "../../../api/modules/orders";
import { toast } from "react-toastify";
import { changeOrderStatusHandler } from "@/utils/changeOrderStatusHandler";

type OrdersContextData = {
  orders: Order[];
  ordersLoading: boolean;
  fetchOrders: () => Promise<void>;
  changeOrderStatus: (orderId: number) => void;
};

const OrdersContext = createContext({} as OrdersContextData);

type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(30);
      setOrders(response);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar os pedidos");
    } finally {
      setOrdersLoading(false);
    }
  };

  const changeOrderStatus = async (orderId: number) => {
    changeOrderStatusHandler(orderId);

    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: OrderStatus.RETIRADO };
      }

      return order;
    });

    setOrders(updatedOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orders, fetchOrders, ordersLoading, changeOrderStatus }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }

  return context;
}
