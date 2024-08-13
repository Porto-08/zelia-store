import { PaymentType } from "@/types";
import { Product } from "../products/types";

export enum OrderStatus {
  RETIRAR = 'RETIRAR',
  RETIRADO = 'RETIRADO',
}

export type Order = {
  id: number;
  payment_type_id?: number;
  customer_name: string;
  customer_phone: string;
  total_price: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  orders_items: OrderItems[];
  payment_types: PaymentType;
};

export type OrderDTO = {
  payment_type_id?: number;
  customer_name?: string;
  customer_phone?: string;
  total_price?: number;
  status?: OrderStatus;
}

export type OrderItemsDTO = {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export type OrderItems = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  products: Product;
}

export type OrderItemsForm = {
  product_id: number;
  quantity: number;
  price: number;
  payment_type_id?: number;
  customer_name?: string;
  customer_phone?: string;
  total_price?: number;
}