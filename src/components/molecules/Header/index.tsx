"use client";
import Link from "next/link";
import { CgMenuHotdog } from "react-icons/cg";
import { FaBoxOpen, FaHome } from "react-icons/fa";
import { IoServer } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

import "./component.css";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useOrders } from "@/context/orders/OrdersContext";

export default function Header() {
  const { fetchOrders } = useOrders();
  const dimensions = useWindowDimensions();
  const isNotSmartphone = dimensions.width > 640;

  const handleFetchOrders = () => {
    fetchOrders();
  };

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
            <Link href="/" className="btn btn-ghost text-3xl font-bold" onClick={handleFetchOrders}>
              Loja da Zélia
            </Link>
          </div>
          <div className="hidden flex-none lg:block ">
            <ul className="menu menu-horizontal">
              <li className="text-xl">
                <Link href="/" onClick={handleFetchOrders}>
                  <FaHome />
                  Início
                </Link>
              </li>
              <li className="text-xl">
                <Link href="/orders">
                  <IoServer />
                  Pedidos
                </Link>
              </li>
              <li className="text-xl">
                <Link href="/products">
                  <FaBoxOpen />
                  Produtos
                </Link>
              </li>
              {isNotSmartphone && (
                <li className="text-xl">
                  <Link href="/reports">
                    <MdSpaceDashboard />
                    Relatórios
                  </Link>
                </li>
              )}
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
            <Link href="/" onClick={handleFetchOrders}>
              <FaHome />
              Início
            </Link>
          </li>
          <li className="text-xl">
            <Link href="/orders">
              <IoServer />
              Pedidos
            </Link>
          </li>
          <li className="text-xl">
            <Link href="/products">
              <FaBoxOpen />
              Produtos
            </Link>
          </li>
          {isNotSmartphone && (
            <li className="text-xl">
              <Link href="/reports">
                <MdSpaceDashboard />
                Relatórios
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
