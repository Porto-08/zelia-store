import { Order, OrderStatus } from "@/app/orders/type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  deleteOrder,
  deleteOrdersItems,
  getOrderById,
  getOrders,
} from "../../../api/modules/orders";
import { toast } from "react-toastify";
import { changeOrderStatusHandler } from "@/utils/changeOrderStatusHandler";
import { useRouter } from "next/navigation";
import { Product } from "@/app/products/types";
import { updateProduct } from "../../../api/modules/products";

type OrdersContextData = {
  orders: Order[];
  ordersLoading: boolean;
  fetchOrders: () => Promise<void>;
  changeOrderStatus: (orderId: number) => void;
  deleteOrderHandler: (orderId: number) => void;
};

const OrdersContext = createContext({} as OrdersContextData);

type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
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

  const deleteOrdersItemsHandler = async (orderId: number) => {
    try {
      await deleteOrdersItems(orderId);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao apagar o pedido");
    }
  };

  const returnProductToStock = async (orderId: number) => {
    try {
      const orders = await getOrderById(orderId);

      orders.orders_items.map(async (orderItem) => {
        const productQuantity = orderItem.quantity;
        const product = orderItem.products as Product;

        const updatedProduct: Product = {
          ...product,
          quantity: product.quantity + productQuantity,
        };

        await updateProduct(product.id, updatedProduct);
      });

      return;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao apagar o pedido");
    }
  };

  const deleteOrderHandler = async (orderId: number) => {
    try {
      const returnProductToStockPromise = returnProductToStock(orderId);
      const deleteOrdersItemsHandlerPromise = deleteOrdersItemsHandler(orderId);

      await Promise.all([
        returnProductToStockPromise,
        deleteOrdersItemsHandlerPromise,
      ]);

      await deleteOrder(orderId);

      toast.success("Pedido apagado com sucesso");

      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao apagar o pedido");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        fetchOrders,
        ordersLoading,
        changeOrderStatus,
        deleteOrderHandler,
      }}
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
