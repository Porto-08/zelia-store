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

type DataToSort = {
  [key: string]: number;
}

export function sortPerTotalPrice(data: DataToSort): DataToSort {
  return Object.entries(data).sort((a, b) => b[1] - a[1]).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as DataToSort);
}