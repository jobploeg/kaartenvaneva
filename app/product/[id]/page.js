"use client";
import { getProduct } from "../../../lib/supabaseAPI";
import ProductOverview from "../../../components/webshop/productOverview";

export default async function Page({ params }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <ProductOverview products={product} />
    </div>
  );
}
