// app/checkout-sessions/route.ts
import { stripe } from "../../lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutBody {
  amount: number;
  quantity: number;
  name: string;
  metadata: any;
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutBody;
  console.log(body.metadata);
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    // 2. Get the user from Supabase auth
    // const supabase = createRouteHandlerClient<Database>({cookies});
    // const {
    //   data: { user }
    // } = await supabase.auth.getUser();

    // 3. Retrieve or create the customer in Stripe
    // const customer = await createOrRetrieveCustomer({
    //   uuid: user?.id || '',
    //   email: user?.email || ''
    // });

    const session = await stripe.checkout.sessions.create({
      mode: "payment", // mode should be subscription
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: body.amount,
            product_data: {
              name: body.name,
            },
          },

          quantity: 1,
        },
      ],
      metadata: body.metadata,

      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["NL", "BE"],
      },
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
