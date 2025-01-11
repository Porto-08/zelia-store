"use client";
import "moment/locale/pt-br";
import Link from "next/link";
import LoadingContent from "@/components/atom/LoadingContent";
import { OrderCard } from "@/components/molecules/Orders/OrderCard";
import { useOrders } from "@/context/orders/OrdersContext";
import { useEffect } from "react";

export default function Home() {
  const {
    orders,
    ordersLoading,
    fetchOrders,
    getProductsStockResume,
    productsStockResume,
  } = useOrders();

  useEffect(() => {
    getProductsStockResume();
    fetchOrders();
  }, []);

  if (ordersLoading) {
    return <LoadingContent />;
  }

  return (
    <main className="px-6 m-auto max-w-7xl">

      {productsStockResume && productsStockResume.length > 0 && (
        <div className="flex flex-col flex-wrap gap-5 mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">Resumo de Estoque</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsStockResume.map((product) => (
              <div
                key={product.productName}
                className="bg-base-300 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold">{product.productName}</h3>
                <p className="text-white text-lg">
                  Vendidos: <span className="text-green-700">{product.quantity_sale}</span>
                </p>
                <p className="text-white text-lg">
                  Estoque: <span className="text-red-700">{product.left_in_stock}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-primary">Ultimos pedidos</span>
          </h1>

          <p className="text-gray-300">
            Aqui você pode visualizar os ultimos pedidos realizados. {""}
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
