"use client"
import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from "react-icons/ai";
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '@/features/shoppingSlice/shopping.slice';
import FormattedPrice from '../products/FormattedPrice';

const CartItem = () => {
    const dispatch = useDispatch();
    const {products, totalPrice} = useSelector(state => state?.shopping);
  return (
    <div className='flex flex-col gap-y-2'>
        <div className="hidden lg:inline-flex items-center justify-between font-semibold bg-white p-2">
            <p className='w-1/3'>Product</p>
            <p className='w-1/3 flex items-center justify-center'>Quantity</p>
            <p className='w-1/3 flex items-center justify-end'>Sub-Total</p>
        </div>
        {/* Generate the product */}
        <div className="flex flex-col gap-y-2">
            {
                products?.map(item => (
                    <div key={item._id} className="md:w-full w-10/12 mx-auto bg-white p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative">
                        {/* product */}
                        <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 items-center justify-center md:justify-start gap-x-3 w-full md:w-1/3">
                            <span onClick={() => dispatch(deleteProduct(item))} className="text-xl hover:text-red-600  cursor-pointer  duration-200 absolute top-4 right-4 md:static"><AiOutlineClose /></span>
                            <div className="size-20 relative">
                            <Image className='object-cover' src={item?.image[0] || "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380"} alt={item?.title} fill />
                            </div>
                            <p className='text-lg'>{item?.title}</p>
                        </div>
                        {/* Quantity */}
                        <div className="flex items-center justify-start gap-x-3 border border-slate-300 py-2 px-4 md:w-auto">
                            {/* <p>Quantity</p> */}
                            <div className="flex items-center justify-between text-lg w-20">
                                <span onClick={() => dispatch(decreaseQuantity(item))}><FiChevronLeft className='cursor-pointer' /></span>
                                <span className="select-none">{item?.quantity}</span>
                                <span onClick={() => dispatch(increaseQuantity(item))}><FiChevronRight className='cursor-pointer' /></span>
                            </div>
                        </div>
                        {/* Sub-total */}
                        <div className="w-full md:w-1/3 flex items-end justify-center md:justify-end">
                            <p className='text-md font-medium'>
                                <FormattedPrice amount={item.price * item.quantity} />
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
        {/* total */}
        <div className='flex items-center justify-center md:justify-end mt-4'>
            <span className='font-medium text-xl'>Total: <FormattedPrice amount={totalPrice} /></span>
        </div>
    </div>
  )
}

export default CartItem