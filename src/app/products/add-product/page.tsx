"use client";
import { Category } from "@/app/categories/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCategories } from "../../../../api/modules/categories";
import { createProduct } from "../../../../api/modules/products";
import { toast } from "react-toastify";
import Link from "next/link";

type ProductForm = {
  name: string;
  price: number;
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
      await createProduct(data);
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao criar o produto.");
    } finally {
      router.push("/products");
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
        <div className="flex items-center gap-10">
          <div>
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

          <div>
            <label htmlFor="price" className="block text-lg font-bold">
              Preço
            </label>
            <input
              type="number"
              id="price"
              className="input input-primary"
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
              {...register("category_id", { required: true })}
            >
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
