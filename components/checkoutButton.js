"use client";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Checkout({ products, ids, quantity, price }) {
  const [isLoading, setIsLoading] = useState(false);

  const onCheckout = async () => {
    setIsLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: ids,
        quantity: quantity,
        price: price,
      }
    );

    window.location = response.data.url;
  };

  return (
    <>
      <Button
        onClick={onCheckout}
        disabled={products.length === 0 || isLoading === true}
        className="w-full"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        betalen
      </Button>
    </>
  );
}
