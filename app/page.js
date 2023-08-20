// Remove use client later
"use client";

import ProductCard from "../components/webshop/productCard";
import { supabase } from "../lib/supabaseClient";
import Filter from "../components/webshop/filter";
import Sort from "../components/webshop/sort";
import Checkout from "../components/checkout_preview";

async function getAllProducts() {
  const { data, error } = await supabase.from("products").select("*");
  // .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export default async function Page() {
  const products = await getAllProducts();
  const categories = await getCategories();

  // //when localstorage chnges, rerender
  // window.addEventListener("storage", () => {
  //   setCategory(localStorage.getItem("category"));
  // });

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Kaarten
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <div className="mt-8 sm:flex sm:items-center sm:justify-between">
            <Filter categories={categories} />

            <Sort />
          </div>
          <ProductCard product={products} />
        </div>
      </section>
      <Checkout />
    </div>
  );
}
