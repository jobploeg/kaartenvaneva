"use client";
import { getProduct } from "../../../lib/supabaseAPI";
import ProductOverview from "../../../components/webshop/productOverview";

export default async function Page({ params }) {
  const product = await getProduct(params.id);

  return (
    <div className="md:w-2/3 md:mx-[15%] mt-20 md:mt-0 ">
      <ProductOverview products={product} />
    </div>
  );
}
