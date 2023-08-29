"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { AddCart } from "../addCart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductOverview({ products }) {
  const router = useRouter();

  const product = products[0];
  const imageURLs = product.imageURLs;
  const imageLength = imageURLs.length;
  const [currentImage, setCurrentImage] = useState(imageURLs[0]);

  return (
    <div className="md:flex md:m-32 m-5">
      <div className="md:w-1/2">
        <Image
          src={
            "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
            currentImage
          }
          alt={product.title}
          width={450}
          height={450}
          key={currentImage}
          className="rounded object-cover shadow h-fit"
        />
        <div className="flex">
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
                className={`rounded object-cover h-32 w-32 mt-4 mr-4 shadow hover:cursor-pointer ${
                  imageURL === currentImage ? "border border-black" : ""
                }
                ${imageLength === 1 ? "hidden" : "block"}
                `}
                onClick={() => setCurrentImage(imageURL)}
              />
            );
          })}
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col md:gap-5 gap-3">
        <h1 className="text-4xl font-medium mt-10 md:mt-0">{product.title}</h1>
        <p className="bg-gray-700 py-2 px-4 text-white rounded w-fit">
          {product.categories.name}
        </p>
        <p> {product.description}</p>
        <p className="text-xl"> € {product.price.toFixed(2)}</p>

        <Button
          className="md:mt-20 w-fit mt-4"
          onClick={() => AddCart(product.id) + router.refresh()}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Toevoegen aan winkelwagen
        </Button>
      </div>
    </div>
  );
}
