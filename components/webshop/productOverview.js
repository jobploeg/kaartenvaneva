"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";

export default function ProductOverview({ products }) {
  const product = products[0];
  const imageURLs = product.imageURLs;

  function addProductToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = product.id;

    const productInCart = cart.find(
      (product) => product.productId === productId
    );

    console.log(productInCart);

    if (productInCart === undefined) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ productId, quantity: 1 }, ...cart])
      );
    } else {
      productInCart.quantity++;
      localStorage.setItem(
        "cart",
        JSON.stringify([{ productId, quantity: productInCart }, ...cart])
      );
    }
  }

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
        <p className="text-xl"> € {product.price}</p>

        <Button className="mt-20 w-fit" onClick={() => addProductToCart()}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Toevoegen aan winkelwagen
        </Button>
      </div>
    </div>
  );
}
