import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text();
  const response = JSON.parse(payload);
  const signature = req.headers.get("stripe-signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeStamp = new Date(response?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("event", event.type);
    return NextResponse.json({ status: "Success", event: event.type });
    // switch (event.type) {
    //   case "checkout.session.completed":
    //     const checkoutSession = event.data.object as Stripe.Checkout.Session;
    //     console.log("checkout session completed", checkoutSession.id);
    //     break;
    // }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 500 }
    );
  }
}
