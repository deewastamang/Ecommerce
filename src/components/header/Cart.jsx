"use client";
import { submitTotalPrice, submitTotalQuantity } from '@/features/shoppingSlice/shopping.slice';
import React, { useEffect, useState } from 'react';
import { IoCartOutline as CartIcon } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const CartButton = () => {
  const dispatch = useDispatch();
  const {products, totalPrice, totalQuantity} = useSelector(state => state.shopping);

  useEffect(() => {
    let amount = 0;
    let quantity = 0;
    products.map(item => {
      amount += item.price * item.quantity;
      quantity += item.quantity
      return 
    })
    dispatch(submitTotalPrice(amount))
    dispatch(submitTotalQuantity(quantity))

  },[products])
  return (
    <>
    <CartIcon className="text-xl hidden md:inline" />
    <p className="text-sm font-semibold whitespace-nowrap">
      Rs. {totalPrice.toFixed(2)}
    </p>
    <span className="bg-white text-orange-600 rounded-full text-sm font-semibold absolute size-5 -right-2 -top-1 flex justify-center items-center shadow-xl shadow-black">
      {totalQuantity}
    </span>
  </>
  )
}

export default CartButton