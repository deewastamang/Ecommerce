"use client";

import { useDispatch, useSelector } from "react-redux";
import FormattedPrice from "../products/FormattedPrice";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { resetCart, saveOrder } from "@/features/shoppingSlice/shopping.slice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { products, totalPrice, userInfo } = useSelector(
    (state) => state?.shopping
  );
  //==========stripe payment starts here=====================
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: products,
          email: session?.user?.email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(saveOrder({ order: products, id: data.data.id }));
        stripe?.redirectToCheckout({ sessionId: data.data.id });
        // dispatch(resetCart());
      } else {
        throw new Error("Failed to create stripe payment");
      }
    } catch (error) {
      console.error("Error occured: ", error.message);
    }
  };

  //==========stripe payment ends here=========================
  return (
    <div className="w-full bg-white p-4 space-y-2">
      <div className="border-b-[1px] border-b-slate-300 py-2">
        <div className="max-w-lg flex items-center justify-between">
          <p className="uppercase font-medium">Sub-Total</p>
          <p>
            <FormattedPrice amount={totalPrice} />
          </p>
        </div>
      </div>
      <div className="border-b-[1px] border-b-slate-300 py-2">
        <div className="max-w-lg flex items-center justify-between">
          <p className="uppercase font-medium">Shipping</p>
          <p>
            <FormattedPrice amount={200} />
          </p>
        </div>
      </div>
      <div className="border-b-[1px] border-b-slate-300 py-2">
        <div className="max-w-lg flex items-center justify-between">
          <p className="uppercase font-medium">Total Price</p>
          <p>
            <FormattedPrice amount={totalPrice + 200} />
          </p>
        </div>
      </div>
      {session || userInfo ? ( //hydration error occurs when we use userInfo for conditional render
        <button
          onClick={handleCheckout}
          className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-green-700 cursor-pointer duration-200 rounded-[3px]"
        >
          Proceed to checkout
        </button>
      ) : (
        <div className="">
          <button className="bg-black text-slate-100 mt-4 px-6 py-3 hover:bg-green-700 cursor-not-allowed duration-200 rounded-[3px]">
            Proceed to checkout
          </button>
          <p className="text-base mt-2 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
