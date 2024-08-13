'use client';
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
  }

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
    return (
      <main className="flex justify-center items-center h-screen">
        <LoadingContent />
      </main>
    );
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
              <div
                key={order.id}
                className="bg-base-300 p-4 rounded-md shadow-md"
              >
                <h3 className="text-xl font-bold">{order.customer_name || "Nome não Informado"}</h3>
                <p className="text-gray-300">
                  Celular: <strong>{order.customer_phone || "Não Informado"}</strong>
                </p>
                <p className="text-gray-300">
                  Forma de pagamento:{" "}
                  <strong>{order.payment_types?.name || "N/A"}</strong>
                </p>
                <p className="text-gray-300">
                  Valor: <strong>R$ {order.total_price}</strong>
                </p>
                <p className="text-gray-300">
                  Data:{" "}
                  <strong>
                    {moment(order.created_at).locale("pt-br").calendar()}
                  </strong>
                </p>

                <h4 className="text-lg font-bold mt-4">Produtos</h4>
                <ul>
                  {order.orders_items.map((orderItem) => (
                    <li key={orderItem.id}>
                      {orderItem.products.name} - {orderItem.quantity}{" "}
                      unidade(s)
                    </li>
                  ))}
                </ul>

                {order.status === OrderStatus.RETIRADO && (
                  <p className="text-green-500 font-bold mt-4">
                    Pedido retirado
                  </p>
                )}

                {order.status !== OrderStatus.RETIRADO && (
                  <button
                    className="mt-4 btn btn-success text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => changeOrderStatus(order.id)}
                  >
                    Marcar como retirado
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
