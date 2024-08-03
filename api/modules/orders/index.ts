import { Order, OrderDTO, OrderItems, OrderItemsDTO } from "@/app/orders/type";
import supabase from "../../supabase";

export async function getOrders(limit: number = 100): Promise<Order[]> {
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
      .order("id", { ascending: false })
      .limit(limit);

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

type OrdersByFilterParams = {
  filter_name?: string;
  filter_products?: number;
  filter_date?: Date;
}

export async function getOrdersByFilter(filter: OrdersByFilterParams): Promise<Order[]> {
  try {
    const { filter_name, filter_products, filter_date } = filter;

    const query = supabase.from("orders").select(`
      *,
      orders_items!inner(*,
        products!inner(*)
      ),
      payment_types(*)
    `);

    if (filter_name) {
      query.eq("customer_name", filter_name);
    }

    if (filter_products) {
      query.eq("orders_items.products.id", filter_products);
    }

    if (filter_date) {
      const dateFormatted = `${filter_date.getFullYear()}-${filter_date.getMonth() + 1}-${filter_date.getDate()}`;
      const dateInitial = `${dateFormatted} 00:00:00`;
      const dateFinal = `${dateFormatted} 23:59:59`;
      
      query.gte("created_at", dateInitial).lte("created_at", dateFinal);
    }

    const { data, error } = await query.order("id", { ascending: false });
    
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}