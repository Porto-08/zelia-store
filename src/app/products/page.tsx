import ProductsList from "@/components/molecules/Products/ProductsList";
import { getProducts } from "../../../api/modules/products";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <main className="px-6 m-auto max-w-7xl">
      <div className="flex item-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Produtos</h1>
          <span>Aqui você encontra todos os produtos disponíveis.</span>
        </div>

        <Link href="/products/add-product" className="btn btn-primary text-white">
          Adicionar produto
        </Link>
      </div>

      <div className="mt-10 w-full">
        <ProductsList
          products={products}
          headers={["ID", "Nome", "Preço", "Estoque", "Ações"]}
        />
      </div>
    </main>
  );
}

export const revalidate = 10;
