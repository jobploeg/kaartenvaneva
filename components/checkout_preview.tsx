"use client";

import { CheckoutBody } from "../app/checkout-sessions/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Button } from "./ui/button";

const MonthlySubscriptionCard = ({ price, metadata }) => {
  const handleClick = async () => {
    // step 1: load stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);
    console.log(metadata);
    // step 2: define the data
    const body: CheckoutBody = {
      amount: price,
      quantity: 1,
      name: "Totaal",
      metadata: {
        product_ids: metadata,
      },
    };

    // step 3: make a post fetch api call to /checkout-session handler
    const result = await fetch("/checkout-sessions", {
      method: "post",
      body: JSON.stringify(body, null),
      headers: {
        "content-type": "application/json",
      },
    });

    // step 4: get the data and redirect to checkout using the sessionId
    const data = (await result.json()) as Stripe.Checkout.Session;
    const sessionId = data.id!;
    stripe?.redirectToCheckout({ sessionId });
  };
  // render a simple card
  return (
    <div className="">
      <Button onClick={() => handleClick()} className="w-full">
        Betalen
      </Button>
    </div>
  );
};
export default MonthlySubscriptionCard;
