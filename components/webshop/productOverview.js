"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addCart } from "../addCart";
import { useRouter } from "next/navigation";

export default function ProductOverview({ products }) {
  const router = useRouter();

  const product = products[0];
  const imageURLs = product.imageURLs;

  return (
    <div className="flex m-32">
      <div className="md:w-1/2">
        {imageURLs.map((imageURL) => {
          return (
            <Image
              src={
                "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                imageURL
              }
              alt={product.title}
              width={450}
              height={450}
              key={imageURL}
              className="rounded"
            />
          );
        })}
      </div>
      <div className="md:w-1/2 flex flex-col gap-5">
        <h1 className="text-4xl font-medium ">{product.title}</h1>
        <p className="bg-gray-700 py-2 px-4 text-white rounded w-fit">
          {product.categories.name}
        </p>
        <p> {product.description}</p>
        <p className="text-xl"> € {product.price.toFixed(2)}</p>

        <Button
          className="mt-20 w-fit"
          onClick={() => addCart(product.id) + router.refresh()}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Toevoegen aan winkelwagen
        </Button>
      </div>
    </div>
  );
}
