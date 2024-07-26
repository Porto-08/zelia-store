import { Order } from "@/app/orders/type";
import supabase from "../../supabase";

export async function getOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        payment_types (
          name
        ),
        products (
          name
        )
      `)

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}