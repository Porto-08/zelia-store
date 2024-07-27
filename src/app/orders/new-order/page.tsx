"use client";
import { useForm } from "react-hook-form";
import { OrderItemsForm } from "../type";
import { useRouter } from "next/navigation";
import { PaymentType } from "@/types";
import { useEffect, useState } from "react";
import { getPaymentTypes } from "../../../../api/modules/payment-types";
import { Product } from "@/app/products/types";
import { getProducts } from "../../../../api/modules/products";

export default function NewOrderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderItemsForm>();
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderPrice, setOrderPrice] = useState(0);

  const router = useRouter();

  async function fetchPaymentTypes() {
    const paymentTypesData = await getPaymentTypes();

    if (!paymentTypesData) {
      return;
    }

    setPaymentTypes(paymentTypesData);
  }

  async function fetchProduts() {
    const productsData = await getProducts();

    if (!productsData) {
      return;
    }

    setProducts(productsData);
  }

  useEffect(() => {
    fetchPaymentTypes();
    fetchProduts();
  }, []);

  async function onSubmit(data: OrderItemsForm) {
    console.log(data);
  }

  return (
    <main className="px-6 m-auto max-w-7xl">
      <div>
        <h1 className="text-5xl font-bold">Nova Venda</h1>
        <span>Preencha os campos abaixo para criar uma nova venda</span>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-10">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {product.name} - R$ {product.price}
              </h2>

              {/* botoes de adicionar e remover e quantidade do produto */}
              <div className="flex gap-5 mt-5">
                <button
                  className="btn btn-primary text-gray-300 w-10"
                  onClick={() => setOrderPrice(orderPrice + product.price)}
                >
                  +
                </button>

                <input
                  type="number"
                  className="input text-center input-primary w-12"
                  value={0}
                  readOnly
                />

                <button
                  className="btn btn-secondary text-gray-300 w-10"
                  onClick={() => setOrderPrice(orderPrice - product.price)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        className="mt-5 flex flex-col items-start gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-10">
          <div className="flex flex-col">
            <label
              htmlFor="payment_type_id"
              className="block text-lg font-bold"
            >
              Forma de pagamento
            </label>
            <select
              className="input input-primary w-96"
              id="payment_type_id"
              {...register("payment_type_id", { required: true })}
            >
              {paymentTypes.map((paymentType) => (
                <option key={paymentType.id} value={paymentType.id}>
                  {paymentType.name}
                </option>
              ))}
            </select>
            {errors.payment_type_id && (
              <span className="text-red-500">Campo obrigatório</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="customer_name" className="block text-lg font-bold">
              Nome do cliente
            </label>
            <input
              className="input input-primary w-96"
              id="customer_name"
              {...register("customer_name")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="customer_phone" className="block text-lg font-bold">
              Telefone do cliente
            </label>
            <input
              className="input input-primary w-96"
              id="customer_phone"
              {...register("customer_phone")}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className="text-lg font-bold"
            onClick={() => setOrderPrice(100)}
          >
            Preço total:
          </label>

          <input
            type="number"
            className="input input-primary w-96"
            value={orderPrice}
            readOnly
          />
        </div>

        <div className="flex gap-5">
          <button type="submit" className="btn btn-primary text-gray-300 w-36">
            Criar venda
          </button>

          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="btn btn-secondary text-gray-300 w-36"
          >
            Voltar
          </button>
        </div>
      </form>
    </main>
  );
}
