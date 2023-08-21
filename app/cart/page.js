"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let cart;

    if (localStorage.getItem("cart")) {
      cart = localStorage.getItem("cart");
    } else {
      cart = cart;
    }

    setCart(cart.split(","));
  }, []);

  // Use cart ids to get the products from supabase and show them
  return <></>;
}
