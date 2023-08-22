import { supabase } from "../../lib/supabaseClient";
import { cookies } from "next/headers";
import Checkout from "../../components/checkout_preview";

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

  const myNums = products.map((product) => product.price);

  let sum = 0;

  for (let i = 0; i < myNums.length; i++) {
    sum += myNums[i];
  }

  const totalPrice = sum * 100;

  return (
    <div className="flex">
      <div className="w-2/3 h-screen  py-24 px-32">
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
      <div className="w-1/3 h-screen bg-gray-200 py-24 px-32 flex items-center flex-col justify-around">
        <h1 className="text-4xl font-semibold ">Bestellen</h1>
        <span>
          <p className="text-xl font-semibold mb-5">Totaal: € {sum}</p>
          <Checkout price={totalPrice} metadata={ids} />
        </span>
      </div>
    </div>
  );
}
