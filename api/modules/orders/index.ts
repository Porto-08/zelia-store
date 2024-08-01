import { Order, OrderDTO, OrderItems, OrderItemsDTO } from "@/app/orders/type";
import supabase from "../../supabase";

export async function getOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        orders_items(*,
          products(*)
        ),
        payment_types(*)
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

export async function createOrder(orderDTO: OrderDTO): Promise<Order> {
  try {
    const { data, error } = await supabase.from("orders").insert(orderDTO)

    if (error) {
      throw error;
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select('*')
      .order("id", { ascending: false })
      .limit(1);

    if (orderError) {
      throw orderError;
    }

    return orderData[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOrderItem(orderItemsDTO: OrderItemsDTO) {
  try {
    const { data, error } = await supabase.from("orders_items").insert(orderItemsDTO);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateOrder(id: number, orderDTO: OrderDTO) {
  try {
    const { data, error } = await supabase.from("orders").update(orderDTO).match({ id });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}