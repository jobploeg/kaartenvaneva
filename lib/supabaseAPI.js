import { supabase } from "../lib/supabaseClient";

export async function getProduct(id) {
  const { data, error } = await supabase.from("products").select().eq("id", id);

  const imageURLs = data[0].imageURLs;
  await Promise.all(
    imageURLs.map(async (imageURL) => {
      const { data } = supabase.storage.from("images").getPublicUrl(imageURL);
    })
  );

  if (error) {
    throw error;
  }

  console.log(data);

  return data;
}
