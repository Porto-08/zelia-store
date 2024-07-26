"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar bg-base-300 py-3 px-6">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-4xl font-bold">
          Loja da Zélia
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="text-2xl">
            <Link href="/products">Produtos</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
