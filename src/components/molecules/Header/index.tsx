"use client";
import useWindowDimensions from "@/app/hooks/useWindowDimensions";
import Link from "next/link";
import { FaBoxOpen, FaStore } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";


export default function Header() {
  const dimensions = useWindowDimensions();

  return (
    <header className="fixed bottom-0 z-50 md:static navbar bg-base-300 py-3 px-6">
      {dimensions.width > 768 ? (
        <>
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-3xl font-bold">
              Loja da Zélia
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li className="text-xl">
                <Link href="/orders">Pedidos</Link>
              </li>
              <li className="text-xl">
                <Link href="/products">Produtos</Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <ul className="flex justify-around w-full">
        <li>
          <Link href="/" className="btn btn-ghost text-3xl font-bold">
            <FaStore />
          </Link>
        </li>
        <li>
          <Link href="/orders" className="btn btn-ghost text-3xl font-bold">
            <FaBoxOpen />
          </Link>
        </li>
        <li>
          <Link href="/products" className="btn btn-ghost text-3xl font-bold">
            <IoFastFood />
          </Link>
        </li>
      </ul>
      )}
      
    </header>
  );
}
