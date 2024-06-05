"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { IoMdCart } from "react-icons/io";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/shoppingSlice/shopping.slice";
import { toast } from "sonner";
import { useAddWishMutation, useGetWishlistQuery, useRemoveWishMutation } from "@/features/orderSlice/order.slice";
import { useSession } from "next-auth/react";

const SingleProduct = ({ singleProduct }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: wishlist, isLoading: getWishlistLoading, refetch } = useGetWishlistQuery();
  const [addWish, { isLoading: wishPostLoading, isSuccess, isError }] = useAddWishMutation();
  const [removeWish, {isLoading: isDeleting, isSuccess: deleted, error: deleteError}] = useRemoveWishMutation();
  
  const [wishExists, setWishExists] = useState(false);

  useEffect(() => {
    const checkWish = wishlist?.data?.find(wish => wish._id === singleProduct._id);
    setWishExists(!!checkWish);
  }, [wishlist, singleProduct._id]);

  const handleWishlistClick = async () => {
    try {
      const payload = {
        email: session?.user?.email,
        name: session?.user?.name,
        wishlist: [singleProduct]
      };
      if(wishExists) {
        const result = await removeWish(singleProduct._id);
        if(result?.data?.success) {
          setWishExists(false)
          toast.success(`${singleProduct?.title} is removed from wishlist`)
          refetch()
        }
        return
      }
      const res = await addWish(payload);
      if (res.data.success) {
        toast.success(`${singleProduct.title} is added to wishlist`);
        refetch();
      } else {
        throw new Error("Post wishlist failed");
      }
    } catch (error) {
      console.error("Failed to post wishlist", error.message);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5 bg-white p-4 rounded-xl">
      {/* Left side */}
      <div className="h-96 relative">
        <Image
          className="object-cover object-top w-full max-h-[700px] rounded-xl"
          src={
            singleProduct?.image[0] ||
            "https://img.freepik.com/free-vector/shopping-sale-carry-bag-emblem_98292-4007.jpg?t=st=1717402526~exp=1717406126~hmac=c52c9a2c0ec62b9ce7395ed1e6a16e31eed2f4b27f9798648069cf096b7d7949&w=1380"
          }
          alt={singleProduct?.title}
          fill
        />
      </div>
      {/* Right side */}
      <div className="flex flex-col justify-center gap-y-10">
        <div className="space-y-2">
          <p className="text-3xl font-semibold">{singleProduct?.title}</p>
          <p className="text-xl font-medium">
            <FormattedPrice amount={singleProduct?.price} />
          </p>
        </div>
        <p className="text-lightText">{singleProduct?.description}</p>
        <div className="text-sm text-lightText flex flex-col gap-y-1">
          <span>
            Category:{" "}
            <span className="text-darkText">{singleProduct?.category}</span>
          </span>
          <span>
            Stock:{" "}
            <span className="text-darkText">
              {singleProduct?.stock || "N/A"}
            </span>
          </span>
        </div>
        <div className="flex items-center cursor-pointer group overflow-hidden rounded-[5px]">
          <button
            onClick={() => {
              dispatch(addToCart(singleProduct));
              toast.success(`${singleProduct.title.substring(0, 15)} is added to cart.`);
            }}
            className="bg-darkText text-slate-100 px-6 py-3 text-sm uppercase flex items-center justify-center border-r-[1px] border-r-slate-500"
          >
            Add to Cart
          </button>
          <span className="bg-darkText text-xl text-slate-100 w-12 h-full flex justify-center items-center group-hover:bg-orange-500 duration-200 overflow-hidden rounded-r-[5px]">
            <IoMdCart />
          </span>
        </div>
        <p
          className="flex items-center gap-x-2 text-sm cursor-pointer"
          onClick={handleWishlistClick}
        >
          {wishExists ? (
            <MdFavorite className="flex items-center text-xl" />
          ) : (
            <MdFavoriteBorder className="flex items-center text-xl" />
          )}
          Add to Wishlist
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
