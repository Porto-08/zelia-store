"use client";
import "moment/locale/pt-br";
import Link from "next/link";
import LoadingContent from "@/components/atom/LoadingContent";
import { OrderCard } from "@/components/molecules/Orders/OrderCard";
import { useOrders } from "@/context/orders/OrdersContext";
import { useEffect } from "react";

export default function Home() {
  const { orders, ordersLoading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (ordersLoading) {
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
