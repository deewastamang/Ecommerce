"use client";

import { useSelector } from "react-redux";
import FormattedPrice from "../products/FormattedPrice";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { saveOrder } from "@/features/shoppingSlice/shopping.slice";
import { useCreateOrderMutation } from "@/features/orderSlice/order.slice";

const PaymentForm = () => {
  const { data: session } = useSession();
  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();
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
      const userEmail = session?.user?.email;
      const userName = session?.user?.name;

      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // items: products, //use when there is backend which stores images
          items: products.map((product) => ({
            ...product,
            image: [
              "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380",
            ],
          })),
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create stripe payment");
      }

      const data = await response.json();

      const payload = {
        email: userEmail,
        name: userName,
        orders: products,
        stripeSessionId: data.data.id,
      }
      const result = await createOrder(payload);
      if (result.success) {
        toast.success("Successfully saved your order");
      }

      // dispatch(saveOrder({ order: processedProducts, id: data.data.id }));
      stripe?.redirectToCheckout({ sessionId: data.data.id });
    } catch (error) {
      console.error("Error occured: ", error.message);
    }
  };
  // const handleCheckout = async () => {
  //   try {
  //     const stripe = await stripePromise;

  //     const response = await fetch("http://localhost:3000/api/checkout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         // items: products, //use when there is backend which stores images
  //         items: products.map((product) => ({
  //           ...product,
  //           image: [
  //             "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380",
  //           ],
  //         })),
  //         email: session?.user?.email,
  //       }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       const result = await createOrder({
  //         email: session?.user?.email,
  //         name: session?.user?.name,
  //         orders: products,
  //         stripeSessionId: data.data.id,
  //       });
  //       // dispatch(saveOrder({ order: products, id: data.data.id }));
  //       // stripe?.redirectToCheckout({ sessionId: data.data.id });
  //     } else {
  //       throw new Error("Failed to create stripe payment");
  //     }
  //   } catch (error) {
  //     console.error("Error occured: ", error.message);
  //   }
  // };

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
