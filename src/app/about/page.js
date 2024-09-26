import React from "react";
import Image from "next/image";
import aboutPng from "@/../../public/assets/images/aboutImage.jpg";

const AboutPage = () => {
  return (
    <div className=" md:flex h-[85vh]">
      <div className="text-container flex-1 flex flex-col gap-10 mx-20 p-20">
        <p className="text-xl text-orange-600 font-bold">About eDokan</p>
        <p className="text-5xl font-bold">
        Your Trusted Online Clothing Store
        </p>
        <p className="text-slate-600 text-lg ">
        At eDokan, we are committed to bringing you the latest trends in fashion with just a click. As a premier online clothing store, we offer a wide selection of stylish apparel for men, women, and children. Whether you're looking for everyday casual wear, formal attire, or seasonal collections, eDokan has something for everyone. Our mission is to provide high-quality, affordable clothing that reflects your unique style, all while ensuring a seamless online shopping experience. Explore our collection and redefine your wardrobe with eDokan, where fashion meets convenience.
        </p>
        <div className="flex gap-10 mt-10">
          <div>
            <p className="font-bold text-4xl text-orange-600">1K+</p>
            <p>Customers</p>
          </div>
          <div>
            <p className="font-bold text-4xl text-orange-600">2+</p>
            <p>Years of experience</p>
          </div>
          <div>
            <p className="font-bold text-4xl text-orange-600"> 20+</p>
            <p>Team members</p>
          </div>
        </div>
      </div>
      <div className="md:flex-1 md:flex md:items-center hidden">
        <div className="image-container relative size-[500px]">
          <Image src={aboutPng}  alt="hi" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
