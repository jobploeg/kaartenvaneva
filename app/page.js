import ProductCard from "../components/webshop/productCard";
import { supabase } from "../lib/supabaseClient";
import Filter from "../components/webshop/filter";
import Sort from "../components/webshop/sort";
import { cookies } from "next/headers";

async function getAllProducts(sort) {
  let query = supabase.from("products").select("*");

  if (sort) {
    switch (sort) {
      //date and name not triggering, why!!!!
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
        query = query;
    }
    query = query.order("price", { ascending: true });
  }

  const { data, error } = await query;

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
  const cookieStore = cookies();

  const sort = cookieStore.get("sort").value;

  const products = await getAllProducts(sort);
  const categories = await getCategories();

  // //when localstorage chnges, rerender
  // window.addEventListener("storage", () => {
  //   setCategory(localStorage.getItem("category"));
  // });
  // console.log(products);
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Kaarten {sort}
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between ">
            <Filter categories={categories} />

            <Sort />
          </div>
          <ProductCard product={products} />
        </div>
      </section>
    </div>
  );
}
