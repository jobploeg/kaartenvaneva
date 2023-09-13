import ProductCard from "../components/webshop/productCard";
import { supabase } from "../lib/supabaseClient";
import Filter from "../components/webshop/filter";
import Sort from "../components/webshop/sort";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { Chicle } from "next/font/google";

const chicle = Chicle({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

async function getAllProducts(sort, categorie) {
  let query = supabase.from("products").select("*, categories!inner(*)");

  if (categorie !== "Alle kaarten") {
    query = query.eq("categories.name", categorie);
  }

  switch (sort) {
    case "date":
      query = query.order("created_at", { ascending: true });

      break;
    case "asc":
      query = query.order("price", { ascending: true });

      break;
    case "desc":
      query = query.order("price", { ascending: false });

      break;
    case "name":
      query = query.order("title", { ascending: true });
      break;
    default:
  }
  query = query.order("price", { ascending: true });

  const { data, error } = await query;

  return { data, error };
}

async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export default async function Page() {
  const cookieStore = cookies();
  let sort;
  let categorie;

  if (cookieStore.get("sort")) {
    sort = cookieStore.get("sort").value;
  }

  if (cookieStore.get("category")) {
    categorie = cookieStore.get("category").value;
  } else {
    categorie = "Alle kaarten";
  }

  const tempProducts = await getAllProducts(sort, categorie);
  const products = tempProducts.data;
  const error = tempProducts.error;

  const categories = await getCategories();

  if (error) {
    return (
      <>
        <h1 className="text-3xl flex justify-center mt-32">
          Er is iets fout gegaan, probeer het later opniew
        </h1>
      </>
    );
  }

  return (
    <div>
      <section>
        <div className="md:mx-auto md:max-w-screen-xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
          <span>
            <h2
              className={`text-2xl text-black tracking-wider ${chicle.className}`}
            >
              Alle kaarten
            </h2>

            <p className=" max-w-md text-black">
              Welkom op mijn webshop. Ik teken zelf kaarten. Deze kun je hier
              kopen! Neem gerust een kijkje. Mochten er vragen zijn dan mag je
              altijd mailen!
            </p>
          </span>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-2 ">
            <Filter categories={categories} />

            <Sort />
          </div>
          <ProductCard product={products} />
        </div>
      </section>
    </div>
  );
}
