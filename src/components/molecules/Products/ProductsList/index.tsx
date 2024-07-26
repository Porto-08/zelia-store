import { Product } from "@/app/products/types";
import Link from "next/link";

type ProductListProps = {
  products: Product[];
  headers: string[];
};

export default function ProductsList({ products, headers }: ProductListProps) {
  return (
    <div className="grid gap-4">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="text-lg">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="text-lg font-bold">{product.id}</td>
                <td className="text-lg font-bold">{product.name}</td>
                <td className="text-lg font-bold">{product.price}</td>
                <td className="text-lg font-bold">{product.quantity}</td>
                <td>
                  <Link href={`/products/${product.id}`}  className="btn btn-secondary text-white">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
