"use client";
import CartItem from "@/components/cartItem/CartItem";
import PaymentForm from "@/components/cartItem/PaymentForm";
import Container from "@/components/header/Container";
import { resetCart } from "@/features/shoppingSlice/shopping.slice";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.shopping);
  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-y-6 items-center justify-center h-96 px-4">
        <p className="text-4xl text-orange-600 font-medium tracking-wide w-full p-2 text-center ">
          Your cart is currently empty
        </p>
        <Link href="/products">
          <button className="bg-darkText text-white py-3 px-6 hover:bg-orange-600 duration-200 rounded-[3px]">
            Return to shop
          </button>
        </Link>
      </div>
    );
  }
  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-2">Cart</h2>
      <div className="space-y-5">
        {/* products quantity and details */}
        <CartItem />
        {/* reset button */}
        <div className="flex items-center justify-center md:justify-end ">
          <button
            onClick={() => dispatch(resetCart())}
            className="bg-red-500 text-base font-semibold text-slate-100 py-2 px-7 hover:bg-red-700 hover:text-white duration-200 rounded-[3px]"
          >
            Reset Cart
          </button>
        </div>
        {/* payment form */}
        <h2 className="text-2xl font-semibold">Cart Totals</h2>
        <PaymentForm />
      </div>
    </Container>
  );
};

export default CartPage;
