"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import { toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";

import FormattedPrice from "../products/FormattedPrice";
import {
  useGetWishlistQuery,
  useRemoveWishMutation,
} from "@/features/orderSlice/order.slice";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/shoppingSlice/shopping.slice";
import { useSession } from "next-auth/react";

const WishlistDetails = () => {
  const dispatch = useDispatch();
  const {data: session} = useSession();
  const {
    data: wishlist,
    isLoading: getWishlistLoading,
    error,
    refetch,
  } = useGetWishlistQuery({userId: session?.user?.userId});
  const [
    removeWish,
    { isLoading: isDeleting, isSuccess: deleted, error: deleteError },
  ] = useRemoveWishMutation();

  const handleDeleteWish = async (wish) => {
    const res = await removeWish({wishId: wish._id, userId: session?.user?.userId});
    if(!res?.data?.success) {
        toast.success("Something went wrong")
        return
    }
    toast.success(`${wish.title} have been removed from wishlist`)
    refetch()
    return 
  }

  if (wishlist?.data?.length === 0 || wishlist?.data === null || error) {
    return (
      <div className="flex flex-col gap-y-6 items-center justify-center h-96 px-4">
        <p className="text-4xl text-orange-600 font-medium tracking-wide w-full p-2 text-center ">
          No any item in wishlist currently
        </p>
        <Link href="/products">
          <button className="bg-darkText text-white py-3 px-6 hover:bg-orange-600 duration-200 rounded-[3px]">
            Go to shop
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <p className="text-2xl font-semibold text-orange-600">Wishlist</p>
      <div className="grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300 mt-5">
        <p className="col-span-4">Items</p>
        <p className="flex items-center justify-center">Price</p>
      </div>
      <div className="flex flex-col py-2 justify-center gap-2">
        {wishlist?.data?.map((item) => (
          <div
            key={item._id}
            className="py-2 border-b-[1px] border-b-gray-300 grid grid-cols-7 items-center"
          >
            <div className="col-span-4 flex items-center gap-2 text-sm">
              <span
                onClick={() => handleDeleteWish(item)}
                className="text-xl hover:text-red-600  cursor-pointer  duration-200 md:static"
              >
                <AiOutlineClose />
              </span>
              <div className="relative size-14">
                <Image
                  className="object-cover w-full h-full"
                  src={
                    item?.image[0] ||
                    "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380"
                  }
                  alt={item?.title}
                  fill
                />
              </div>
              <div className="md:ml-2">
                <p className="text-base font-semibold mb-.5">{item?.title}</p>
                <p className="">{item?.description}</p>
              </div>
            </div>
            <p className="flex items-center justify-center">
              <FormattedPrice amount={item?.price} />
            </p>
            <div className="w-full flex justify-center col-span-2">
              <Button
                variant="primary"
                className="bg-orange-600 hover:bg-orange-700 flex gap-x-2 w-32"
                onClick={() =>
                  dispatch(addToCart(item)) &&
                  toast.success(`${item.title} is added to cart`)
                }
              >
                <IoMdCart className="text-xl" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistDetails;
