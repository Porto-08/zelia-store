"use client";
import { Order, OrderStatus } from "./orders/type";
import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../../api/modules/orders";
import moment from "moment";
import "moment/locale/pt-br";
import Link from "next/link";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import LoadingContent from "@/components/atom/LoadingContent";
import { changeOrderStatusHandler } from "../utils/changeOrderStatusHandler";
import { OrderCard } from "@/components/molecules/Orders/OrderCard";

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(30);
      setOrders(response);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar os pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  if (loading) {
    return <LoadingContent />;
  }

  return (
    <main className="px-6 m-auto max-w-7xl">
      <div className="flex flex-wrap gap-5 justify-between items-center mt-8">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-primary">Ultimos pedidos</span>
          </h1>

          <p className="text-gray-300">
            Aqui você pode visualizar os utlimos 30 pedidos realizados. {""}
            <Link href="/orders" className="text-primary underline">
              Ver mais.
            </Link>
          </p>
        </div>

        <Link
          href="/orders/new-order"
          className="btn btn-primary text-xl text-gray-300"
        >
          Novo pedido
        </Link>
      </div>

      {orders.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                customer_name={order.customer_name}
                customer_phone={order.customer_phone}
                payment_name={order.payment_types?.name}
                total_price={order.total_price}
                created_at={order.created_at}
                orders_items={order.orders_items}
                status={order.status}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
