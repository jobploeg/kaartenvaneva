import { supabase } from "../../lib/supabaseClient";
import { cookies } from "next/headers";
import Checkout from "../../components/checkout_preview";
import SetQuantity from "../../components/cart/setQuantity";

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

function calculateTotalPrice(products, quantity) {
  const myNums = products.map(
    (product) => product.price * quantity[product.id]
  );

  let sum = 0;

  for (let i = 0; i < myNums.length; i++) {
    sum += myNums[i];
  }

  const totalPrice = sum * 100;

  return totalPrice;
}

export default async function Page() {
  let cart;
  const cookieStore = cookies();
  if (cookieStore.get("cart")) {
    cart = cookieStore.get("cart").value;
  }

  if (!cookieStore.get("cart")) {
    cart = "";
  }

  const tempId = cart.split(",");
  const removeEmtpyString = tempId.pop();
  const ids = [...new Set(tempId)];

  //use thing below for editing amounts of products
  let quantity = tempId.reduce(
    (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
    {}
  );

  const products = await getProducts(ids);
  const totalPrice = calculateTotalPrice(products, quantity);

  if (cart === "") {
    return (
      <>
        <h1 className="text-4xl font-semibold p-20">
          Geen producten in winkelwagen
        </h1>
      </>
    );
  }

  return (
    <div className="flex">
      <div className="w-2/3 h-screen  py-24 px-32">
        <SetQuantity quantity={quantity} products={products} />
      </div>
      <div className="w-1/3 h-screen bg-gray-200 py-24 px-32 flex items-center flex-col justify-around">
        <h1 className="text-4xl font-semibold ">Bestellen</h1>
        <span>
          <p className="text-xl font-semibold mb-5">
            Totaal: € {(totalPrice / 100).toFixed(2)}
          </p>
          <Checkout price={totalPrice} metadata={ids} />
        </span>
      </div>
    </div>
  );
}
