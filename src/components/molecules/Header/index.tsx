"use client";
import Link from "next/link";
import { CgMenuHotdog } from "react-icons/cg";
import "./component.css";

export default function Header() {
  return (
    <div className="sticky top-0 drawer z-50 md:static">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <CgMenuHotdog className="text-3xl" />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <Link href="/" className="btn btn-ghost text-3xl font-bold">
              Loja da Zélia
            </Link>
          </div>
          <div className="hidden flex-none lg:block ">
            <ul className="menu menu-horizontal">
              <li className="text-xl">
                <Link href="/orders">Pedidos</Link>
              </li>
              <li className="text-xl">
                <Link href="/products">Produtos</Link>
              </li>
              <li className="text-xl">
                <Link href="/reports">Relatórios</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li className="text-xl">
            <Link href="/orders">Pedidos</Link>
          </li>
          <li className="text-xl">
            <Link href="/products">Produtos</Link>
          </li>
          <li className="text-xl">
            <Link href="/reports">Relatórios</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
