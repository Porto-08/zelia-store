"use client";
import { Category } from "../../category/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCategories } from "../../../../api/modules/categories";
import { createProduct } from "../../../../api/modules/products";
import { toast } from "react-toastify";
import Link from "next/link";
import useFormatPrice from "@/app/utils/formatPrice";
import formatPrice from "@/app/utils/formatPrice";

type ProductForm = {
  name: string;
  price: string;
  quantity: number;
  category_id: number;
};

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();

  const router = useRouter();

  async function fetchCategories() {
    const categories = await getCategories();

    if (!categories) {
      return;
    }

    setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    try {
      const formatedData = {
        ...data,
        price: formatPrice(data.price),
      };

      await createProduct(formatedData);
      toast.success("Produto criado com sucesso!");
      router.push("/products");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao criar o produto.");
    }
  };

  return (
    <main className="px-6 m-auto max-w-7xl">
      <div>
        <h1 className="text-5xl font-bold">Criar Produto</h1>
        <span>Preencha os campos abaixo para criar um novo produto</span>
      </div>

      <form
        className="mt-5 flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex flex-col w-full md:w-96">
            <label htmlFor="name" className="block text-lg font-bold">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="input input-primary"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">O nome é obrigatório</span>
            )}
          </div>

          <div className="flex flex-col w-full md:w-96">
            <label htmlFor="price" className="block text-lg font-bold">
              Preço
            </label>
            <input
              type="text"
              id="price"
              className="input input-primary"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">O preço é obrigatório</span>
            )}
          </div>

          <div className="flex flex-col w-full md:w-96">
            <label htmlFor="quantity" className="block text-lg font-bold">
              Estoque
            </label>
            <input
              type="number"
              id="quantity"
              className="input input-primary"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <span className="text-red-500">O estoque é obrigatório</span>
            )}
          </div>

          <div className="flex flex-col w-full md:w-96">
            <label htmlFor="categories" className="block text-lg font-bold">
              Categoria
            </label>
            <select
              id="categories"
              className="select select-primary"
              {...register("category_id", { required: true })}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <span className="text-red-500">A categoria é obrigatória</span>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-5">
          <button type="submit" className="btn btn-primary text-white">
            Criar Produto
          </button>
          <Link href="/products" className="btn btn-secondary text-white">
            Voltar
          </Link>
        </div>
      </form>
    </main>
  );
}
