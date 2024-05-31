"use client";
import { calculatePercentage } from "@/helper";
import Image from "next/image";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { IoCartOutline as CartIcon } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/shoppingSlice/shopping.slice";
import { toast } from "sonner";

const ProductData = ({ product }) => {
  const dispatch = useDispatch();


  const starArray = Array.from({ length: product.rating }, (_, index) => (
    <span key={index} className="text-yellow-400">
      <IoIosStar />
    </span>
  ));

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const animation = useAnimation();

  React.useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        transition: {
          type: "spring",
          duration: 3,
          bounce: 0.3,
        },
        opacity: 1,
      });
    }
    if (!inView) {
      animation.start({
        y: 50,
        opacity: 0,
      });
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="w-full rounded-xl overflow-hidden"
    >
      {/* incase of navigating to another page with search parameter */}
      {/* <Link href={{pathname: "/products/product", query: {_id: product._id}}}> */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-96 group overflow-hidden">
          <Image
            className="object-cover group-hover:scale-105 duration-500"
            src={product?.image}
            alt={`${product.title} image`}
            fill
          />
          <div className="size-full group-hover:bg-black/10 absolute"></div>/
          {product?.new && (
            <span className="select-none absolute top-3 right-3 font-medium text-xs text-black bg-slate-200 py-1 px-3 rounded-full group-hover:bg-orange-600 group-hover:text-white">
              New Arrival
            </span>
          )}
        </div>
      </Link>
      <div className="border border-slate-300 border-t-0 px-2 py-4 flex flex-col gap-y-4 bg-white rounded-b-lg ">
        <Link href={`/products/${product._id}`}><p className="text-md font-medium">{product?.title}</p></Link>
        <div className="flex justify-between items-center">
          <div className="border-[1px] border-orange-600 py-1 px-4 rounded-full text-xs text-muted select-none">
            <p>{calculatePercentage(product.price, product.oldPrice)}% off</p>
          </div>
          <div className="flex items-center gap-x-2">
            <p className="text-slate-500 line-through text-sm">
              <FormattedPrice amount={product.oldPrice} />
            </p>
            <p className="font-semibold">
              <FormattedPrice amount={product.price} />
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={() => dispatch(addToCart(product)) && toast.success(`${product.title.substring(0,15)} added successfully.`)} className="whitespace-nowrap flex items-center gap-x-2 bg-orange-600 px-4 py-2 text-sm tracking-wide rounded-full text-slate-100 hover:bg-orange-800 hover:text-white duration-200">
            <CartIcon className="text-xl" />
            Add to cart
          </button>
          <div className="flex items-center gap-x-1">{starArray}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductData;
