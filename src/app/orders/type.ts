export type Order = {
  id: number;
  product_id: number;
  payment_type_id: number;
  customer_name: string;
  customer_phone: string;
  withdrawal: boolean;
  value: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  products: {
    name: string;
  },
  payment_types: {
    name: string;
  }
};