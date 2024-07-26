import { Category, CategoryDTO } from "@/app/categories/types";
import supabase from "../../supabase";

export async function getCategories(): Promise<Category[] | null> {
  try {
    let { data: categories, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      throw error;
    }

    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategory(id: number): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCategory(
  categoryDTO: CategoryDTO
): Promise<any> {
  try {
    const { data } = await supabase.from("categories").insert([categoryDTO]);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCategory(id: number, categoryDTO: CategoryDTO): Promise<any> {
  try {
    const { data } = await supabase
      .from("categories")
      .update(categoryDTO)
      .eq("id", id)
      .single();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCategory(id: number): Promise<void> {
  try {
    await supabase.from("categories").delete().eq("id", id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
