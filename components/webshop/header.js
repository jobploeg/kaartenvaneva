"use client";

import { ShoppingCart } from "lucide-react";
import { GetCart } from "../../components/addCart";
import Link from "next/link";
import { useEffect, useState } from "react";

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
