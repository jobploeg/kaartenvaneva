"use client";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Checkout({ products, ids, quantity, price }) {
  let loading = false;

  const onCheckout = async () => {
    loading = true;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: ids,
        quantity: quantity,
        price: price,
      }
    );

    window.location = response.data.url;
    loading = false;
  };

  if (loading === true) {
    return (
      <>
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Laden
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        onClick={onCheckout}
        disabled={products.length === 0}
        className="w-full"
      >
        betalen
      </Button>
    </>
  );
}
