"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let cart;
    let newCart = [];

    if (localStorage.getItem("cart")) {
      cart = localStorage.getItem("cart");
    } else {
      cart = cart;
    }

    cart = cart.split(",");

    //filters out duplicates
    // !! need to add to quantity !!
    cart = [...new Set(cart)];

    cart.map((item) => {
      let quantity = 1;
      console.log(item);

      newCart.push({
        id: item,
        quantity: quantity,
      });
    });

    setCart(newCart);
  }, []);

  // console.log(cart);

  // Use cart ids to get the products from supabase and show them
  return <></>;
}
