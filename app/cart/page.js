import { supabase } from "../../lib/supabaseClient";
import { cookies } from "next/headers";
import Image from "next/image";

// import Cart from "../../components/cart";
// import getCart from "../../components/addCart";

async function getProducts(ids) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .in("id", ids);

  if (error) {
    throw error;
  }

  return data;
}

export default async function Page() {
  const cookieStore = cookies();
  const cart = cookieStore.get("cart").value;

  const tempId = cart.split(",");
  const removeEmtpyString = tempId.pop();
  const ids = [...new Set(tempId)];

  const products = await getProducts(ids);
  console.log(products);
  return (
    <div className="flex">
      <div className="w-1/2 h-screen  py-24 px-32">
        {products.map((product) => (
          <div key={product.id} className="mb-5 flex gap-2 flex-col">
            <h1 className="text-2xl">{product.title}</h1>
            <p>{product.description}</p>
            <p className="mb-3 text-lg font-semibold">
              € {product.price.toFixed(2)}{" "}
            </p>

            <hr />
          </div>
        ))}
      </div>
      <div className="w-1/2 h-screen bg-gray-200 p-20 ">
        <h1 className="text-4xl font-semibold flex justify-center">
          Bestellen
        </h1>
      </div>
    </div>
  );
}
