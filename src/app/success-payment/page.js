"use client";

import Container from "@/components/header/Container";
import { resetCart } from "@/features/shoppingSlice/shopping.slice";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(resetCart());
  },[dispatch]);
  return (
    <Container className="flex items-center justify-center py-20">
      <Confetti />
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <p className="text-4xl font-bold animate-bounce">
          Your payment has been accepted by{" "}
          <span className="text-orange-600">Deewas Store.</span>
        </p>
        <p className="text-lg text-slate-500">
          Now you can view your orders or continue shopping with us.
        </p>
        <div className="flex items-center gap-x-5">
            <button onClick={() => router.replace('/order')} className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300">
              View orders
            </button>
            <button onClick={() => router.replace('/products')}  className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300">
              Continue shopping
            </button>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPage;
