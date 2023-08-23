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
  const cartLength = tempId.length - 1;
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
    <div className="md:mx-40 my-20 mx-5">
      <h1 className="text-4xl font-bold ">Winkelwagen</h1>

      <div className="md:flex justify-between">
        <div className="md:w-1/2 md:h-screen  md:py-20 py-10">
          <SetQuantity quantity={quantity} products={products} />
        </div>
        <div className="md:w-2/6 px-10 h-fit bg-gray-200  flex  flex-col mt-10 md:mt-20 py-10 rounded">
          <h1 className="text-2xl font-semibold mb-5">Overzicht</h1>
          <div className="flex justify-between mb-8">
            <div>
              <p className="mb-2">Artikelen ({cartLength})</p>
              <p className="mb-2">Verzendkosten</p>
              <p className="font-semibold mt-10">Nog te betalen</p>
            </div>
            <div>
              <p className="mb-2 font-semibold">
                € {(totalPrice / 100).toFixed(2)}
              </p>
              <p className=" mb-2 font-semibold text-green-700">€ 0.00</p>
              <p className="font-semibold mt-10">
                € {(totalPrice / 100).toFixed(2)}
              </p>
            </div>
          </div>
          <hr />

          <Checkout price={totalPrice} metadata={ids} />
        </div>
      </div>
    </div>
  );
}
