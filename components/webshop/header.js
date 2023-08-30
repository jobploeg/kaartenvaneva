"use client";

import { ShoppingCart } from "lucide-react";
import { GetCart } from "../../components/addCart";
import Link from "next/link";

export default function Header() {
  let totalCart;
  const cart = GetCart();

  if (cart !== 0 || cart !== undefined) {
    const tempCart = cart.split(",");
    totalCart = tempCart.length - 1;
  }

  return (
    <div className="pt-9 px-12 flex justify-between">
      <nav>
        <Link href={"/"} className="text-2xl text-red-700 font-semibold">
          kaartenvanEva
        </Link>
      </nav>
      <div className=" hover:cursor-pointer">
        <Link href={"/cart"} className="flex">
          <ShoppingCart className="scale-125" />
          <p className="-mt-4 ml-2 font-semibold text-xl">{totalCart}</p>
        </Link>
      </div>
    </div>
  );
}
