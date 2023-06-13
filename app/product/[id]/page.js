"use client";
import { useParams } from "next/navigation";
import { getProduct } from "../../../lib/supabaseAPI";
import ProductOverview from "../../../components/webshop/productOverview";

export default async function Page() {
  const { id } = useParams();
  const product = await getProduct(id);

  return (
    <div>
      <ProductOverview products={product} />
    </div>
  );
}
