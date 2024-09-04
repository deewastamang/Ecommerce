"use client";
import React from "react";
import bannerOne from "@/../../public/assets/images/bannerone.jpg";
import bannerTwo from "@/../../public/assets/images/bannertwo.jpg";
import bannerThree from "@/../../public/assets/images/bannerthree.jpg";
import zeroTwoImage from "@/../../public/assets/images/zerotwo.jpg";
import BannerText from "./BannerText";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Image from "next/image";

 const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="p-2 bg-slate-100 rounded-full size-10 flex items-center justify-center absolute z-50 left-6 top-1/2 cursor-pointer hover:text-orange-600  hover:bg-white duration-200 text-3xl" onClick={onClick}>
      <MdKeyboardArrowLeft />
    </div>
  );
};
 const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="p-2 bg-slate-100 rounded-full size-10 flex items-center justify-center absolute z-50 right-6 top-1/2 cursor-pointer hover:text-orange-600  hover:bg-white duration-200 text-3xl" onClick={onClick}>
      <MdKeyboardArrowRight />
    </div>
  );
};

const Banner = () => {
  const carouselData = [
    {
      image: bannerOne,
      title: "Outwear Picks",
      alt: "iamge of new collection",
      description:
        "Grab out latest and limited edition collection this summer for the most elegant and classy look",
      firstButtonLink: "http://localhost:3000/about",
      secondButtonLink: "http://localhost:3000/shop",
    },
    {
      image: bannerTwo,
      title: "Summer Collection",
      alt: "time for summer",
      description:
        "Discover our exclusive summer collection, designed to elevate your style with timeless elegance and sophistication.",
      firstButtonLink: "http://localhost:3000/about",
      secondButtonLink: "http://localhost:3000/shop",
    },
    {
      image: bannerThree,
      title: "Exclusive awesomeness",
      alt: "third baner image",
      description:
        "Elevate your summer wardrobe with our newest limited edition pieces, crafted for an effortlessly chic and refined look.",
      firstButtonLink: "http://localhost:3000/about",
      secondButtonLink: "http://localhost:3000/shop",
    },
    {
      image: zeroTwoImage,
      title: "Cool Outfit",
      alt: "fourth banner image",
      description:
        "Get an awesome and stunning outfit collection",
      firstButtonLink: "http://localhost:3000/about",
      secondButtonLink: "http://localhost:3000/shop",
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    speed: 500, //speed to scroll to another image
    autoplaySpeed: 3000, //duration of image to show in screen
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {carouselData.map((item) => (
          <div key={item.title} className="w-full h-screen max-h-[85dvh] relative">
            <Image
              className="object-cover object-right relative"
              src={item.image}
              alt={item.alt}
              // width="100%"
              fill
            />
            <BannerText title={item.title} description={item.description} firstButtonLink={item.firstButtonLink} secondButtonLink={item.secondButtonLink} />
          </div>
        ))}
      </Slider>
        <div className="absolute w-full h-44 bg-gradient-to-t from-gray-100 to-transparent bottom-0 left-0 z-10"></div>
    </div>
  );
};

export default Banner;
