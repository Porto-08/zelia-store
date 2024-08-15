"use client";

import { OrdersProvider } from "./orders/OrdersContext";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <OrdersProvider>{children}</OrdersProvider>;
}
