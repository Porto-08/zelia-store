import { api } from "../../config/axios";
import { Product, ProductDTO } from "@/app/products/types";
import supabase from "../../supabase";

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from("products").select();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    let { data, error } = await supabase.from("products").select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("id", id)
    .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createProduct(productDTO: ProductDTO): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(productDTO)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProduct(
  id: number,
  productDTO: ProductDTO
): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(productDTO)
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await supabase.from("products").delete().eq("id", id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
