"use client"
import React from "react";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { IoMdCart } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/shoppingSlice/shopping.slice";
import { toast } from "sonner";

const SingleProduct = ({ singleProduct }) => {
  const dispatch = useDispatch();
  return (
    <div className="grid lg:grid-cols-2 gap-5 bg-white p-4 rounded-xl">
      {/* left side */}
      <div className=" h-96 relative">
        <Image
          className="object-cover object-top w-full max-h-[700px] rounded-xl"
          src={singleProduct?.image[0] || "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380" }
          alt={singleProduct?.title}
          fill
        />
      </div>
      {/* right side */}
      <div className="flex flex-col justify-center gap-y-10">
        <div className="space-y-2">
          <p className="text-3xl font-semibold">{singleProduct?.title}</p>
          <p className="text-xl font-medium">
            <FormattedPrice amount={singleProduct?.price} />
          </p>
        </div>
        <p className="text-lightText">{singleProduct?.description}</p>
        <div className="text-sm text-lightText flex flex-col gap-y-1">
          <span className="">
            Category:{" "}
            <span className="text-darkText">{singleProduct?.category}</span>
          </span>
          <span className="">
            Stock:{" "}
            <span className="text-darkText">{singleProduct?.stock || "N/A"}</span>
          </span>
        </div>
        <div className="flex items-center cursor-pointer group overflow-hidden rounded-[5px]">
          <button onClick={() => dispatch(addToCart(singleProduct)) && toast.success(`${singleProduct.title.substring(0,15)} added successfully.`)} className="bg-darkText text-slate-100 px-6 py-3 text-sm uppercase flex items-center justify-center border-r-[1px] border-r-slate-500">
            Add to Cart
          </button>
          <span className="bg-darkText text-xl text-slate-100 w-12 h-full flex justify-center items-center group-hover:bg-orange-500 duration-200 overflow-hidden rounded-r-[5px]">
            <IoMdCart />
          </span>
        </div>
        <p className="flex items-center gap-x-2 text-sm">
          <MdFavoriteBorder className="flex items-center text-xl" />
          Add to Wishlist
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
