"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let cart;
    let newCart = [];

    //get cart from localstorage
    if (localStorage.getItem("cart")) {
      cart = localStorage.getItem("cart");
    } else {
      cart = cart;
    }

    //transfrom cart from string to array
    cart = cart.split(",");

    // count and remove duplicates, result id/quantity
    cart = cart.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

    //go over cart and save id and quantity as value
    Object.entries(cart).map(([key, value]) => {
      newCart.push({
        id: key,
        quantity: value,
      });
    });

    setCart(newCart);
  }, []);

  console.log(cart);

  // Use cart ids to get the products from supabase and show them
  return <></>;
}
