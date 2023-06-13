import { supabase } from "../lib/supabaseClient";

export async function getProduct(id) {
  //get products with id and foreign key
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, description, price, categories:categories (name), imageURLs"
    )
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
}
