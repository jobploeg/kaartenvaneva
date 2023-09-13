import { supabase } from "../../lib/supabaseClient";
import { cookies } from "next/headers";
import Checkout from "../../components/checkoutButton";
import SetQuantity from "../../components/cart/setQuantity";
import { Chicle } from "next/font/google";

const chicle = Chicle({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

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
        <h1 className="text-4xl font-semibold p-5 md:p-20 mb-60">
          Geen producten in winkelwagen
        </h1>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
      <span>
        <h2
          className={`text-2xl text-black tracking-wider ${chicle.className}`}
        >
          Winkelwagen
        </h2>

        <p className="max-w-md text-black">
          Dit is je winkelwagen. Bekijk al je producten, voeg meer toe of
          verwijder ze. Check het overzicht, en bestellen maar!
        </p>
      </span>

      <div className="md:flex justify-between">
        <div className="md:max-w-1/3 md:h-screen  md:py-20 py-10 ">
          <SetQuantity quantity={quantity} products={products} />
        </div>
        <div className="md:w-2/6 px-10 h-fit border border-black  flex  flex-col mt-10 md:mt-20 py-10 rounded sticky top-20">
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

          <Checkout
            ids={tempId}
            products={products}
            quantity={quantity}
            price={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}
