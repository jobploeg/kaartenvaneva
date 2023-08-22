"use client";

import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState([]);

  useEffect(() => {
    let cart;
    let newCart = [];
    let ids;

    //get cart from localstorage
    if (localStorage.getItem("cart")) {
      cart = localStorage.getItem("cart");
    } else {
      cart = cart;
    }

    //transfrom cart from string to array
    cart = cart.split(",");

    // count and remove duplicates, result id : quantity
    cart = cart.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

    // transfer id strings to number
    ids = Object.keys(cart).map(Number);
    setProductId(ids);

    //go over cart and save id and quantity as value
    // Object.entries(cart).map(([key, value]) => {
    //   newCart.push({
    //     id: key,
    //     quantity: value,
    //   });
    // });

    setCart(cart);
    localStorage.setItem("id", ids);
  }, []);

  // console.log(cart);
  return productId;
}
