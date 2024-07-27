import { PaymentType } from "@/types";
import supabase from "../../supabase";

export async function getPaymentTypes(): Promise<PaymentType[]> {
  try {
    const { data, error } = await supabase.from("payment_types").select('*');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
