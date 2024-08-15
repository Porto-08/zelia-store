import { OrderStatus } from "@/app/orders/type";
import { useOrders } from "@/context/orders/OrdersContext";
import moment from "moment";
import Link from "next/link";

type OrderCardProps = {
  id: number;
  customer_name?: string;
  customer_phone?: string;
  payment_name?: string;
  total_price: number;
  created_at: string;
  orders_items: {
    id: number;
    products: {
      name: string;
    };
    quantity: number;
  }[];
  status: string;
};

export function OrderCard(order: OrderCardProps) {
  const { changeOrderStatus } = useOrders();

  return (
    <div key={order.id} className="bg-base-300 p-4 rounded-md shadow-md">
      <h3 className="text-xl font-bold">
        {order.customer_name || "Nome não Informado"}
      </h3>
      <p className="text-gray-300">
        Celular: <strong>{order.customer_phone || "Não Informado"}</strong>
      </p>
      <p className="text-gray-300">
        Forma de pagamento: <strong>{order.payment_name || "N/A"}</strong>
      </p>
      <p className="text-gray-300">
        Valor: <strong>R$ {order.total_price}</strong>
      </p>
      <p className="text-gray-300">
        Data:{" "}
        <strong>{moment(order.created_at).locale("pt-br").calendar()}</strong>
      </p>

      <h4 className="text-lg font-bold mt-4">Produtos</h4>
      <ul>
        {order.orders_items.map((orderItem: any) => (
          <li key={orderItem.id}>
            {orderItem.products.name} - {orderItem.quantity} unidade(s)
          </li>
        ))}
      </ul>

      <div className="flex flex-col justify-between">
        {order.status === OrderStatus.RETIRADO && (
          <p className="text-green-500 font-bold mt-4">Pedido retirado</p>
        )}
        {order.status !== OrderStatus.RETIRADO && (
          <button
            className="mt-4 btn btn-success text-white font-bold py-2 px-4"
            type="button"
            onClick={() => changeOrderStatus(order.id)}
          >
            Marcar como retirado
          </button>
        )}

        <Link href={`/orders/${order.id}`} className="btn btn-primary mt-4">
          Editar pedido
        </Link>
      </div>
    </div>
  );
}
