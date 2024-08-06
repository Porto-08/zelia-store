"use client";
import LoadingContent from "@/components/atom/LoadingContent";
import { useEffect, useState } from "react";
import { Order, OrderStatus } from "./type";
import { getOrders, getOrdersByFilter, updateOrder } from "../../../api/modules/orders";
import { toast } from "react-toastify";
import { getProducts } from "../../../api/modules/products";
import { Product } from "../products/types";
import moment from "moment";
import "moment/locale/pt-br";
import "./page.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import { changeOrderStatusHandler } from "../../utils/changeOrderStatusHandler";
import { ptBR } from 'date-fns/locale';
registerLocale('ptBr', ptBR);


type FilterForm = {
  filter_name: string;
  filter_products: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterForm>();
  const [date, setDate] = useState<Date | null>();

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar os pedidos");
    } finally {
      setLoading(false);
    }
  };

  async function fetchProduct() {
    const productsData = await getProducts();

    if (!productsData) {
      return;
    }

    setProducts(productsData);
  }

  useEffect(() => {
    fetchOrders();
    fetchProduct();
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

  async function onSubmit(data: FilterForm) {
    setLoading(true);

    try {
      const response = await getOrdersByFilter({
        filter_name: data.filter_name,
        filter_products: Number(data.filter_products),
        filter_date: date ? date : undefined,
      });

      setOrders(response);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar os pedidos");
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col gap-8 px-6 m-auto max-w-7xl">
      <div className="flex flex-wrap gap-5 justify-between items-center mt-8">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-primary">Pedidos</span>
          </h1>

          <p className="text-gray-300">
            Aqui você pode visualizar os pedidos realizados.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <form
          className="flex flex-wrap gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className="flex flex-col w-full md:w-44"
            {...register("filter_name")}
          >
            <input
              type="text"
              className="input input-primary"
              id="filter_name"
              placeholder="Filtrar por cliente"
              {...register("filter_name")}
            />
          </div>

          <div className="flex flex-col w-full md:w-44">
            <select
              id="filter_products"
              className="select select-primary"
              {...register("filter_products")}
            >
              <option value="#">Filtrar por produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <DatePicker
            className="input input-primary"
            locale="ptBr"
            placeholderText="Filtrar por data"
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat={"dd/MM/yyyy"}
          />
        

          <button type="submit" className="btn btn-primary text-gray-300 w-40">
            Filtrar
          </button>

          <button
            type="button"
            className="btn btn-secondary text-gray-300 w-40"
            onClick={() => fetchOrders()}
          >
            Limpar
          </button>
        </form>
      </div>

      {loading && <LoadingContent />}

      {orders.length > 0 && (
        <div>
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
