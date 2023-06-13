"use client";
import { useParams } from "next/navigation";
import { getProduct } from "../../../../lib/supabaseAPI";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [categorie, setCategorie] = useState();
  const [imageURLs, setImageURLs] = useState([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProduct(id);
      setProduct(product[0]);
      setImageURLs(product[0].imageURLs);
      setCategorie(product[0].categories.name);
    }
    fetchProduct();
  }, [id]);

  return (
    <div className="m-10 flex gap-2 flex-col w-1/2">
      <h1 className="text-2xl font-medium mb-3">{product.title}</h1>
      <p>{product.description}</p>
      <p>€ {product.price}</p>
      <p>{categorie}</p>
      {/* {imageURLs.map((imageURL) => {
        return (
          <Image
            src={
              supabaseUrl +
              "/storage/v1/object/sign/images/" +
              imageURL +
              "?token=" +
              supabaseKey +
              "&t=" +
              Date.now()
            }
            alt={product.title}
            width={200}
            height={200}
            key={imageURL}
          />
        );
      })} */}
    </div>
  );
}
