import { supabase } from "../lib/supabaseClient";

export async function getProduct(id) {
  const { data, error } = await supabase.from("products").select().eq("id", id);

  const imageURLs = data[0].imageURLs[0];

  const images = await getImages(imageURLs);

  data[0].imageURLs = images;

  console.log(images);

  if (error) {
    throw error;
  }

  return data;
}

async function getImages(imageURLs) {
  const { data } = await supabase.storage
    .from("images")
    .getPublicUrl(imageURLs);

  return data;
}
