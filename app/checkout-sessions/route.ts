// app/checkout-sessions/route.ts
import { stripe } from "../../lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutBody {
  amount: number;
  quantity: number;
  name: string;
  description: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // mode should be subscription
      line_items: [
        // generate inline price and product
        {
          price_data: {
            currency: "eur",

            unit_amount: body.amount,

            product_data: {
              name: body.name,
              description: body.description,
            },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "eur",

            unit_amount: body.amount,

            product_data: {
              name: body.name,
              description: body.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout-sessions/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout-sessions/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
