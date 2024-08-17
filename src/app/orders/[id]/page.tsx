"use client";
import { useEffect, useState } from "react";
import Title from "@/components/atom/Title";
import { Order, OrderItemsForm } from "../type";
import LoadingContent from "@/components/atom/LoadingContent";
import { toast } from "react-toastify";
import {
  createOrderItem,
  deleteOrdersItems,
  getOrderById,
  updateOrder,
} from "../../../../api/modules/orders";
import { useForm } from "react-hook-form";
import { getPaymentTypes } from "../../../../api/modules/payment-types";
import { getProducts, updateProduct } from "../../../../api/modules/products";
import { PaymentType } from "@/types";
import { Product } from "@/app/products/types";
import { useRouter } from "next/navigation";
import { useOrders } from "@/context/orders/OrdersContext";

type PageParams = {
  params: {
    id: string;
  };
};

export default function OrderPage({ params }: PageParams) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderItems, setOrderItems] = useState<OrderItemsForm[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderItemsForm>();

  const { deleteOrderHandler } = useOrders();

  const incrementOrderPrice = (price: number) => {
    const newOrderPrice = orderPrice + price;

    setOrderPrice(newOrderPrice);
  };

  const decrementOrderPrice = (price: number) => {
    if (orderPrice - price < 0) {
      return;
    }

    setOrderPrice(orderPrice - price);
  };

  const incrementProductQuantity = (productId: number) => {
    const product = products.find((product) => product.id === productId);

    if (!product || product.quantity === 0) {
      return;
    }

    const orderItem = orderItems.find(
      (orderItem) => orderItem.product_id === productId
    );

    if (orderItem) {
      if (orderItem.quantity === product.quantity) {
        return;
      }

      orderItem.quantity += 1;
      setOrderItems([...orderItems]);
    } else {
      setOrderItems([
        ...orderItems,
        {
          product_id: productId,
          quantity: 1,
          price: product.price,
          payment_type_id: 1,
        },
      ]);
    }

    incrementOrderPrice(product.price);
  };

  const decrementProductQuantity = (productId: number) => {
    const product = products.find((product) => product.id === productId);

    if (!product || product.quantity === 0) {
      return;
    }

    const orderItem = orderItems.find(
      (orderItem) => orderItem.product_id === productId
    );

    if (!orderItem) {
      return;
    }

    if (orderItem.quantity === 1) {
      setOrderItems(
        orderItems.filter((orderItem) => orderItem.product_id !== productId)
      );
    } else {
      orderItem.quantity -= 1;
      setOrderItems([...orderItems]);
    }

    decrementOrderPrice(product.price);
  };

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

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(Number(params.id));
      const orderItemsData = response.orders_items.map((orderItem) => ({
        product_id: orderItem.product_id,
        quantity: orderItem.quantity,
        price: orderItem.price,
        payment_type_id: response.payment_type_id,
      }));

      setOrder(response);
      setOrderPrice(response.total_price);
      setOrderItems(orderItemsData);

      localStorage.setItem("orderItems", JSON.stringify(orderItemsData));
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar o pedido");
    } finally {
      setLoading(false);
    }
  };

  const getNewProductQuantity = (
    productQuantity: number,
    newOrderItemQuantity: number,
    previousOrderItemQuantity?: number
  ) => {
    let newProductQuantity = productQuantity;

    if (previousOrderItemQuantity) {
      if (previousOrderItemQuantity > newOrderItemQuantity) {
        newProductQuantity += previousOrderItemQuantity - newOrderItemQuantity;
      } else {
        newProductQuantity -= newOrderItemQuantity - previousOrderItemQuantity;
      }
    } else {
      newProductQuantity -= newOrderItemQuantity;
    }

    return newProductQuantity;
  };

  const onSubmit = async (data: OrderItemsForm) => {
    if (orderItems.length === 0) {
      toast.error("Selecione ao menos um produto");
      return;
    }

    if (orderPrice === 0 || !orderPrice) {
      toast.error("O preço total não pode ser 0");
      return;
    }

    try {
      await updateOrder(Number(params.id), {
        payment_type_id: data.payment_type_id || undefined,
        customer_name: data.customer_name || "",
        customer_phone: data.customer_phone || "",
        total_price: orderPrice,
      });

      orderItems.forEach(async (orderItem) => {
        const orderItemData = {
          order_id: params.id,
          product_id: orderItem.product_id,
          quantity: orderItem.quantity,
          price: orderItem.price * orderItem.quantity,
        };

        const product = products.find(
          (product) => product.id === orderItem.product_id
        );

        if (!product) {
          return;
        }

        const orderItemsLocalStorage = JSON.parse(
          localStorage.getItem("orderItems")!
        );

        const orderItemLocalStorage = orderItemsLocalStorage.find(
          (orderItemLocalStorage: { product_id: number }) =>
            orderItemLocalStorage.product_id === orderItem.product_id
        );

        const previousOrderItemQuantity = orderItemLocalStorage.quantity;
        const newOrderItemQuantity = orderItem.quantity;
        let productQuantity = getNewProductQuantity(
          product.quantity,
          newOrderItemQuantity,
          previousOrderItemQuantity
        );

        await deleteOrdersItems(Number(params.id));

        const createOrderItemPromise = createOrderItem({
          ...orderItemData,
          order_id: Number(params.id),
        });

        const updateProductPromise = updateProduct(orderItem.product_id, {
          quantity: productQuantity,
        });

        await Promise.all([createOrderItemPromise, updateProductPromise]);
      });

      toast.success("Pedido atualizado com sucesso");

      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o pedido");
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchProduts();
    fetchPaymentTypes();

    return () => {
      setOrder(null);
      setProducts([]);
      setPaymentTypes([]);
    };
  }, [params.id]);

  useEffect(() => {
    if (order) {
      reset({
        payment_type_id: order?.payment_type_id,
      });
    }
  }, [order]);

  if (loading) {
    return <LoadingContent />;
  }

  return (
    <main className="px-6 m-auto max-w-7xl">
      <Title title={`Editando Pedido - #${order?.id}`} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {products &&
          products.map((product) => (
            <div key={product.id} className="card bg-base-100 w-full shadow-xl">
              <div className="card-body">
                <div>
                  <h2 className="card-title">
                    {product.name} - R$ {product.price}
                  </h2>

                  {product.quantity > 0 && (
                    <p className="text-lg">{product.quantity} em estoque</p>
                  )}
                </div>

                {product.quantity === 0 ? (
                  <span className="text-xl text-red-500">Esgotado</span>
                ) : (
                  <div className="flex gap-5 mt-5">
                    <button
                      className="btn btn-secondary text-gray-300 w-10"
                      onClick={() => decrementProductQuantity(product.id)}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="input input-primary w-20"
                      value={
                        orderItems.find(
                          (orderItem) => orderItem.product_id === product.id
                        )?.quantity || 0
                      }
                      readOnly
                    />

                    <button
                      className="btn btn-primary text-gray-300 w-10"
                      onClick={() => incrementProductQuantity(product.id)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <form
        className="mt-5 flex flex-col items-start gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col w-full md:w-96">
            <label
              htmlFor="payment_type_id"
              className="block text-lg font-bold"
            >
              Forma de pagamento
            </label>
            <select
              className="input input-primary"
              id="payment_type_id"
              {...register("payment_type_id")}
            >
              <option value="">Selecione uma forma de pagamento</option>
              {paymentTypes.map((paymentType) => (
                <option key={paymentType.id} value={paymentType.id}>
                  {paymentType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-96">
            <label htmlFor="customer_name" className="block text-lg font-bold">
              Nome do cliente
            </label>
            <input
              className="input input-primary"
              id="customer_name"
              defaultValue={order?.customer_name}
              {...register("customer_name")}
            />
          </div>

          <div className="flex flex-col w-full md:w-96">
            <label htmlFor="customer_phone" className="block text-lg font-bold">
              Telefone do cliente
            </label>
            <input
              className="input input-primary "
              id="customer_phone"
              defaultValue={order?.customer_phone}
              {...register("customer_phone")}
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-96">
          <label className="text-lg font-bold">Preço total:</label>

          <input
            type="number"
            className="input input-primary text-xl "
            value={orderPrice}
            readOnly
            id="total_price"
          />
        </div>

        <div className="flex gap-5">
          <button type="submit" className="btn btn-primary text-gray-300 w-36">
            Salvar
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn btn-secondary text-gray-300 w-36"
          >
            Voltar
          </button>
        </div>
      </form>

      <section className="mt-10 bg-base-100 p-5 rounded-lg flex flex-col gap-10 items-start">
        <div>
          <h3 className="text-xl font-bold md:text-2xl">Exclusão de pedido</h3>
          <span>
            Ao excluir o pedido, você não poderá mais recuperá-lo. Tem certeza
            que deseja excluir o pedido?
          </span>
        </div>

        <button className="btn btn-error text-white" onClick={() => deleteOrderHandler(Number(params.id))}>
          Excluir pedido
        </button>
      </section>
    </main>
  );
}
