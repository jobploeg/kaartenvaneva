import { supabase } from "../lib/supabaseClient";

export async function getCategories() {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    throw error;
  }

  return categories;
}

export async function getProducts() {
  let { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    throw error;
  }

  return products;
}

export async function getProduct(id) {
  const { data, error } = await supabase.from("products").select().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
}
