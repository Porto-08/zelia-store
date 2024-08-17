import { Order, OrderDTO, OrderItems, OrderItemsDTO } from "@/app/orders/type";
import supabase from "../../supabase";
import { ReportGenericData } from "@/app/reports/types";
import moment from "moment";
import { sortPerStatusDelivered, sortPerTotalPrice } from "@/utils/sortPerStatusDelivered";

export async function getOrderById(id: number): Promise<Order> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `*, 
        orders_items(*, 
          products(*)
        ),
        payment_types(*)
      `
      )
      .eq("id", id)
      .limit(1);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrders(limit: number = 100): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        orders_items(*,
          products(*)
        ),
        payment_types(*)
      `
      )
      .order("id", { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    const dataSorted = sortPerStatusDelivered(data);

    return dataSorted;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOrder(orderDTO: OrderDTO): Promise<Order> {
  try {
    const { data, error } = await supabase.from("orders").insert(orderDTO);

    if (error) {
      throw error;
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
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
    const { data, error } = await supabase
      .from("orders_items")
      .insert(orderItemsDTO);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteOrder(id: number) {
  try {
    const { data, error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteOrdersItems(id: number) {
  try {
    const { data, error } = await supabase.from("orders_items").delete().eq("order_id", id);

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
    const { data, error } = await supabase
      .from("orders")
      .update(orderDTO)
      .match({ id });

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
};

export async function getOrdersByFilter(
  filter: OrdersByFilterParams
): Promise<Order[]> {
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
      const dateFormatted = `${filter_date.getFullYear()}-${
        filter_date.getMonth() + 1
      }-${filter_date.getDate()}`;
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

export async function getSalesByDay(): Promise<ReportGenericData[]> {
  try {
    const { data, error } = await supabase.from("orders").select("*").order("id", { ascending: false });

    if (error) {
      throw error;
    }

    const salesByDay = data.reduce((acc: any, order: Order) => {
      const date = moment(order.created_at).locale("pt-br").calendar(null, {
        sameDay: "[Hoje]",
        nextDay: "[Amanhã]",
        nextWeek: "DD/MM/YYYY",
        lastDay: "[Ontem]",
        lastWeek: "DD/MM/YYYY",
        sameElse: "DD/MM/YYYY",
      });

      if (!acc[date]) {
        acc[date] = 0;
      }

      acc[date] += order.total_price;

      return acc;
    }, {});

    return Object.keys(salesByDay).map((key) => ({
      label: key,
      value: salesByDay[key],
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSalesByMonth(): Promise<ReportGenericData[]> {
  try {
    const { data, error } = await supabase.from("orders").select("*").order("id", { ascending: false });

    if (error) {
      throw error;
    }

    const salesByMonth = data.reduce((acc: any, order: Order) => {
      const date = moment(order.created_at).locale("pt-br").format("MM/YYYY");
      if (!acc[date]) {
        acc[date] = 0;
      }

      acc[date] += order.total_price;

      return acc;
    }, {});

    return Object.keys(salesByMonth).map((key) => ({
      label: key,
      value: salesByMonth[key],
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSalesByPaymentType(): Promise<ReportGenericData[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, payment_types(*)`);

    if (error) {
      throw error;
    }

    const dataAggregated = data.reduce((acc: any, item: any) => {
      if (!acc[item.payment_types.name]) {
        acc[item.payment_types.name] = 0;
      }

      acc[item.payment_types.name] += item.total_price;

      return acc;
    }, {});

    const dataAggregatedSorted = sortPerTotalPrice(dataAggregated);

    return Object.keys(dataAggregatedSorted).map((key) => ({
      label: key,
      value: dataAggregated[key],
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSalesByProduct(): Promise<ReportGenericData[]> {
  try {
    const { data, error } = await supabase.from("orders_items").select(`
        *,
        products(*)
      `);

    if (error) {
      throw error;
    }

    const dataAggregated = data.reduce((acc: any, item: any) => {
      if (!acc[item.products.name]) {
        acc[item.products.name] = {
          total_quantity: 0,
          total_price: 0,
        };
      }

      acc[item.products.name].total_quantity += item.quantity;
      acc[item.products.name].total_price += item.price;

      return acc;

    }, {});

    const dataAggregatedSorted = sortPerTotalPrice(dataAggregated);

    return Object.keys(dataAggregatedSorted).map((key) => ({
      label: key,
      value: dataAggregated[key].total_price,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
