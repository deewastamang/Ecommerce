"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormattedPrice from "../products/FormattedPrice";

const OrderDetails = () => {
  const { orderData } = useSelector((state) => state?.shopping);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amount = 0;
    orderData?.order?.map((item) => {
      amount += item.price * item.quantity;
      return;
    });
    setTotalAmount(amount);
  }, [orderData.order]);
  return (
    <div>
      <div className="grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300">
        <p className="col-span-4">Items</p>
        <p className="flex items-center justify-center">Quantity</p>
        <p className="flex items-center justify-center">Unit Price</p>
        <p className="flex items-center justify-center">Amount</p>
      </div>
      <div className="flex flex-col py-2 justify-center gap-2">
        {orderData?.order?.map((item) => (
          <div
            key={item._id}
            className="py-2 border-b-[1px] border-b-gray-300 grid grid-cols-7 items-center"
          >
            <div className="col-span-4 flex items-start gap-2 text-sm">
              <div className="relative size-14 w-20">
                <Image
                  className="object-cover"
                  src={item?.image}
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
      <div className="text-lg font-medium mt-10 py-2 border-b-[1px] border-b-gray-300 ">
        <p>Payment Details</p>
      </div>
      <p className="mt-2">Total Paid: <span className="text-lg font-semibold"><FormattedPrice amount={totalAmount} /></span></p>
    </div>
  );
};

export default OrderDetails;
