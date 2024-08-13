import { Order, OrderStatus } from "@/app/orders/type";

export function sortPerStatusDelivered(orders: Order[]): Order[] {
  return orders.sort((a: Order, b: Order) => {
    if (a.status === OrderStatus.RETIRAR) {
      return -1;
    }

    return 1;
  }
  );
}