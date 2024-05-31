import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const reqBody = await req.json();
    const { items, email } = await reqBody;

    const extractingItems = await items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image], //because image can be multiple
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success-payment`,
      cancel_url: `${process.env.BASE_URL}/cart`,
      metadata: {
        email,
      },
    });

    return NextResponse.json({
      success: true,
      msg: "Connection is active",
      data: { id: session.id },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: `Error in checkout api: ${error.message}` },
      { status: 400 }
    );
  }
};
