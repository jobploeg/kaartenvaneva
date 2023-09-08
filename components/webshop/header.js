"use client";

import { ShoppingCart } from "lucide-react";
import { GetCart } from "../../components/addCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Chicle } from "next/font/google";

const chicle = Chicle({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Header() {
  const [totalCart, setTotalCart] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let cart = GetCart();
    if (cart) {
      setTotalCart(cart.length - 1);
    } else {
      setTotalCart(0);
    }
  });

  return (
    <div className="pt-9 px-5 md:px-12 flex justify-between">
      <nav>
        <Link href={"/"} className="text-3xl text-red-700 font-bold">
          <h1 className={`${chicle.className} text-5xl`}>kaartenvanEva</h1>
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
