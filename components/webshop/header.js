"use client";

import { ShoppingCart } from "lucide-react";
import { GetCart } from "../../components/addCart";
import Link from "next/link";

export default function Header() {
  const cart = GetCart().split(",");

  const totalCart = cart.length - 1;

  return (
    <>
      <nav></nav>
      <div className="flex justify-end pt-12 pr-12 hover:cursor-pointer">
        <Link href={"/cart"} className="flex">
          <ShoppingCart className="scale-125" />
          <p className="-mt-4 ml-2 font-semibold text-xl">{totalCart}</p>
        </Link>
      </div>
    </>
  );
}
