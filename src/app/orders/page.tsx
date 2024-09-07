"use client";
import LoadingContent from "@/components/atom/LoadingContent";
import { useEffect, useState } from "react";
import { getOrdersByFilter } from "../../../api/modules/orders";
import { toast } from "react-toastify";
import { getProducts } from "../../../api/modules/products";
import { Product } from "../products/types";
import "moment/locale/pt-br";
import "./page.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { OrderCard } from "@/components/molecules/Orders/OrderCard";
import { useOrders } from "@/context/orders/OrdersContext";
registerLocale("ptBr", ptBR);

type FilterForm = {
  filter_name: string;
  filter_products: string;
};

export default function OrdersPage() {
  const { orders, fetchOrders, ordersLoading, setOrdersLoading, setOrders } =
    useOrders();
  const [products, setProducts] = useState<Product[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterForm>();
  const [date, setDate] = useState<Date | null>();

  async function fetchProduct() {
    const productsData = await getProducts();

    if (!productsData) {
      return;
    }

    setProducts(productsData);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function onSubmit(data: FilterForm) {
    setOrdersLoading(true);

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
      setOrdersLoading(false);
    }
  }

  if (ordersLoading) {
    return <LoadingContent />;
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

      {orders.length > 0 && (
        <div>
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
