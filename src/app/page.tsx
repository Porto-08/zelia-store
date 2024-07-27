"use client";
import { Order } from "./orders/type";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/modules/orders";
import moment from "moment";
import "moment/locale/pt-br";
import Link from "next/link";

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();

      console.log(data);

      if (!data) {
        return;
      }

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <main className="px-6 m-auto max-w-7xl">
      <div className="flex justify-between items-center mt-8">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-primary">Pedidos</span>
          </h1>

          <p className="text-gray-300">
            Aqui você pode visualizar os pedidos realizados e marcar como
            retirado quando o cliente retirar o pedido.
          </p>
        </div>

        <Link
          href="/orders/new-order"
          className="btn btn-primary text-gray-300"
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
                <h3 className="text-xl font-bold">{order.customer_name}</h3>
                <p className="text-gray-300">
                  Celular: <strong>{order.customer_phone}</strong>
                </p>
                <p className="text-gray-300">
                  Forma de pagamento:{" "}
                  <strong>{order.payment_types.name}</strong>
                </p>
                <p className="text-gray-300">
                  Valor: <strong>R$ {order.value}</strong>
                </p>
                <p className="text-gray-300">
                  Data:{" "}
                  <strong>
                    {moment(order.created_at).locale("pt-br").calendar()}
                  </strong>
                </p>

                <h4 className="text-lg font-bold mt-4">Produtos</h4>
                <ul>
                  <li className="text-gray-300">{order.products.name}</li>
                </ul>

                <button
                  className="mt-4 btn btn-primary text-white font-bold py-2 px-4 rounded"
                  type="button"
                  disabled={order.withdrawal}
                >
                  {order.withdrawal
                    ? "Pedido retirado"
                    : "Marcar como retirado"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
