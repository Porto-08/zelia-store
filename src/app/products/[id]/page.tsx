"use client";

import { useEffect, useState } from "react";
import { Product } from "../types";
import { deleteProduct, getProduct } from "../../../../api/modules/products";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "../../category/types";
import { getCategories } from "../../../../api/modules/categories";
import { updateProduct } from "../../../../api/modules/products";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import formatPrice from "@/app/utils/formatPrice";

type PageParams = {
  params: {
    id: string;
  };
};

type ProductForm = {
  name: string;
  price: string;
  quantity: number;
  category_id: number;
};

export default function ProductPage({ params }: PageParams) {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();

  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProduct(Number(params.id));

      if (!product) {
        return;
      }

      setProduct(product);
    }

    async function fetchCategories() {
      const categories = await getCategories();

      if (!categories) {
        return;
      }

      setCategories(categories);
    }

    fetchCategories();
    fetchProduct();
  }, [params.id]);

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    try {
      const formatedData = {
        ...data,
        price: formatPrice(data.price),
      };
      await updateProduct(Number(params.id), formatedData);
      toast.success("Produto atualizado com sucesso!");

      router.push("/products");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao atualizar o produto.");
    }
  };

  const deleteProductHandler = async () => {
    try {
      await deleteProduct(Number(params.id));
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao excluir o produto.");
    }  finally {
      router.push("/products");
    }
  };

  return (
    <main className="px-6 m-auto max-w-7xl">
      {product && (
        <>
          <div>
            <h1 className="text-5xl font-bold">
              Editar Produto ({product.name})
            </h1>
            <span>Edite as informações do produto abaixo.</span>
          </div>

          <form
            className="mt-5 flex flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-10">
              <div>
                <label htmlFor="name" className="block text-lg font-bold">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-primary"
                  defaultValue={product.name}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">O nome é obrigatório</span>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-lg font-bold">
                  Preço
                </label>
                <input
                  type="string"
                  id="price"
                  className="input input-primary"
                  defaultValue={product.price}
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500">O preço é obrigatório</span>
                )}
              </div>

              <div>
                <label htmlFor="quantity" className="block text-lg font-bold">
                  Estoque
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="input input-primary"
                  defaultValue={product.quantity}
                  {...register("quantity", { required: true })}
                />
                {errors.quantity && (
                  <span className="text-red-500">O estoque é obrigatório</span>
                )}
              </div>

              <div>
                <label htmlFor="categories" className="block text-lg font-bold">
                  Categoria
                </label>
                <select
                  id="categories"
                  className="select select-primary w-full max-w-xs"
                  defaultValue={product.category_id}
                  {...register("category_id", { required: true })}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <span className="text-red-500">
                    A categoria é obrigatória
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-5">
              <button type="submit" className="btn btn-primary text-white">
                Editar produto
              </button>
              <Link href="/products" className="btn btn-secondary text-white">
                Voltar
              </Link>
            </div>
          </form>
        </>
      )}

      <section className="mt-10 bg-base-100 p-5 rounded-lg flex flex-col gap-10 items-start">
        <h3 className="text-2xl font-bold">
          Você também pode excluir este produto clicando no botão abaixo, mas
          tenha certeza do que está fazendo.
        </h3>

        <button
          onClick={deleteProductHandler}
          className="btn btn-error text-white"
        >
          Excluir produto
        </button>
      </section>
    </main>
  );
}
