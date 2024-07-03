"use client";
import { useGetFeaturedProductsQuery } from "@/features/productSlice/product.slice";
import React from "react";
import ProductData from "./ProductData";
import Container from "../header/Container";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="p-2 bg-slate-100 rounded-full size-10 flex items-center justify-center absolute z-50 left-6 top-1/2 cursor-pointer hover:text-orange-600  hover:bg-white duration-200 text-3xl"
      onClick={onClick}
    >
      <MdKeyboardArrowLeft />
    </div>
  );
};
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="p-2 bg-slate-100 rounded-full size-10 flex items-center justify-center absolute z-50 right-6 top-1/2 cursor-pointer hover:text-orange-600  hover:bg-white duration-200 text-3xl"
      onClick={onClick}
    >
      <MdKeyboardArrowRight />
    </div>
  );
};

const FeaturedProductsHomePage = () => {
  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useGetFeaturedProductsQuery();

  // to slide show
//   var settings = {
//     dots: false,
//     infinite: true,
//     speed: 4000,
//     autoplaySpeed: 2000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true, 
//     autoplaySpeed: 0, //Setting this to 0 creates a continuous scroll effect.
//     cssEase: "linear", //This makes the scroll transition linear for a consistent speed.
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     pauseOnHover: true,
//   };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false, 
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div>
      <p className="text-5xl font-semibold text-orange-600 text-center mt-8 select-none hover:text-orange-500">
        Featured Products
      </p>
      <Container className="">
        <Slider {...settings}>
          {featuredProducts?.data?.map((product) => (
            <div
              key={product.title}
              className="w-full relative px-2"
            >
              <ProductData key={product._id} product={{ ...product }} />
            </div>
          ))}
        </Slider>
        <div className="pt-10 flex justify-center">
            <Button variant="outline" className=" rounded-full text-orange-600 bg-white flex items-center gap-x-5">See all ({featuredProducts?.data?.length.toString()}) <FaArrowRightLong /></Button>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProductsHomePage;
