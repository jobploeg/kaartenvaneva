"use client";
import { useParams } from "next/navigation";
import { getProduct } from "../../../../lib/supabaseAPI";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProduct(id);
      setProduct(product[0]);
    }
    fetchProduct();
  }, []);

  return (
    <div className="m-10 flex gap-2 flex-col w-1/2">
      <h1 className="text-2xl font-medium mb-3">{product.title}</h1>
      <p>{product.description}</p>
      <p>€ {product.price}</p>
      <p>{product.category}</p>
    </div>
  );
}
