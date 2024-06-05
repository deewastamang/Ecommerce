"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";


import FormattedPrice from "../products/FormattedPrice";
import { useGetOrdersQuery } from "@/features/orderSlice/order.slice";
import { useSession } from "next-auth/react";

const OrderDetails = () => {
  const {data: session} = useSession();
  const {data: orderData, error, isLoading, refetch } = useGetOrdersQuery({userId: session?.user?.userId});
  const [totalPrice, setTotalPrice] = useState(0)
  console.log('order in order page ', orderData)
  useEffect(() => {
    let totalPrice = 0;
    orderData?.data?.orders?.map(item => {
      totalPrice += item.price * item.quantity;
      return 
    })
    setTotalPrice(totalPrice)
  },[orderData])

  if(orderData?.data?.orders?.length === 0 || orderData?.data === null || error) {
    return (
      <div className="flex flex-col gap-y-6 items-center justify-center h-96 px-4">
      <p className="text-4xl text-orange-600 font-medium tracking-wide w-full p-2 text-center ">
        No orders currently
      </p>
      <Link href="/products">
        <button className="bg-darkText text-white py-3 px-6 hover:bg-orange-600 duration-200 rounded-[3px]">
          Go to shop
        </button>
      </Link>
    </div>
    )
  }
  return (
    <div>
      <p className="text-2xl font-semibold text-orange-600">Orders</p>
      <div className="grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300 mt-5">
        <p className="col-span-4">Items</p>
        <p className="flex items-center justify-center">Quantity</p>
        <p className="flex items-center justify-center">Unit Price</p>
        <p className="flex items-center justify-center">Amount</p>
      </div>
      <div className="flex flex-col py-2 justify-center gap-2">
        {orderData?.data?.orders?.map((item) => (
          <div
            key={item._id}
            className="py-2 border-b-[1px] border-b-gray-300 grid grid-cols-7 items-center"
          >
            <div className="col-span-4 flex items-start gap-2 text-sm">
              <div className="relative size-14 w-20">
                <Image
                  className="object-cover"
                  src={item?.image[0] || "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380"}
                  alt={item?.title}
                  // width="500"
                  // height="500"
                  fill
                />
              </div>
              <div className="md:ml-2">
                <p className="text-base font-semibold mb-.5">{item?.title}</p>
                <p className="">{item?.description}</p>
              </div>
            </div>
            <p className="flex items-center justify-center">{item?.quantity}</p>
            <p className="flex items-center justify-center"><FormattedPrice amount={item?.price} /></p>
            <p className="flex items-center justify-center"><FormattedPrice amount={item?.price * item?.quantity} /></p>

          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="font-medium">Status: <span className="bg-orange-600 text-white rounded-full px-3 py-1">{orderData?.data?.status}</span></p>
      </div>
      <div className="text-lg font-medium mt-10 py-2 border-b-[1px] border-b-gray-300 ">
        <p>Payment Details</p>
      </div>
      <p className="mt-2">Total Paid: <span className="text-lg font-semibold"><FormattedPrice amount={totalPrice} /></span></p>
    </div>
  );
};

export default OrderDetails;

