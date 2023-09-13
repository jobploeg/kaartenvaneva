"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { AddCart } from "../addCart";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  if (product.length === 0) {
    return (
      <div className="mb-40 md:mt-20">
        <h1> Geen producten</h1>
      </div>
    );
  }
  return (
    <ul className="mt-4 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
      {product.map((product) => (
        <div
          key={product.id}
          className="flex flex-column group overflow-hidden rounded-md"
        >
          <li className="my-3">
            <Link href={`/product/${product.id}`}>
              <Image
                src={
                  "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                  product.imageURLs[0]
                }
                alt={product.title}
                height={300}
                width={300}
                className="w-screen h-80 object-cover bg-center rounded transition duration-500 hover:scale-90 hover:rounded-md shadow-sm"
                loading="lazy"
              />
            </Link>

            <div className="flex-1">
              <h3 className="text-xl mt-2">{product.title}</h3>
              <p className="font-medium text-lg">
                <span className="sr-only"> Prijs </span>
                <span>€ {product.price.toFixed(2)}</span>
              </p>

              <span className="flex md:justify-between ">
                <Button
                  variant="outline"
                  className="mt-4 w-max border-black hover:bg-transparent hover:scale-y-105"
                >
                  <Link href={`/product/${product.id}`}>Bekijk product</Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-105 shadow-none ml-5 scale-110 mt-3.5 md:mt-0 md:ml-0 md:scale-100 hover:bg-transparent border-none"
                  onClick={() => AddCart(product.id) + router.refresh()}
                >
                  <ShoppingCart />
                </Button>
              </span>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
}
