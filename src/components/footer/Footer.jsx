"use client";
import React, { useState } from "react";
import paymentImage from "@/../../public/assets/images/payment.png";
import {
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsReddit,
} from "react-icons/bs";
import Logo from "../header/Logo";
import Container from "../header/Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-darkText text-slate-100">
      <Container className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10 place-items-center md:place-items-start mx-10 xl:mx-0">
          <div className="flex flex-col gap-y-4 items-center md:items-start">
            <p className="text-xl font-semibold select-none">Customer Service</p>
            <p className="text-justify">
            We Are 24-7 In touch. We deliver bar-setting customer care, and we are here to help YOU.
            </p>
            <div className="flex justify-start items-center gap-x-4 mt-5">
              <Link href="#" target="_blank">
                <span className="bg-slate-100 p-1 inline-flex items-center justify-center rounded-[5px] text-lg text-darkText hover:bg-orange-600 hover:text-white cursor-pointer duration-200">
                  <BsYoutube />
                </span>
              </Link>
              <Link href="#" target="_blank">
                <span className="bg-slate-100 p-1 inline-flex items-center justify-center rounded-[5px] text-lg text-darkText hover:bg-orange-600 hover:text-white cursor-pointer duration-200">
                  <BsFacebook />
                </span>
              </Link>
              <Link href="#" target="_blank">
                <span className="bg-slate-100 p-1 inline-flex items-center justify-center rounded-[5px] text-lg text-darkText hover:bg-orange-600 hover:text-white cursor-pointer duration-200">
                  <BsReddit />
                </span>
              </Link>
              <Link href="#" target="_blank">
                <span className="bg-slate-100 p-1 inline-flex items-center justify-center rounded-[5px] text-lg text-darkText hover:bg-orange-600 hover:text-white cursor-pointer duration-200">
                  <BsLinkedin />
                </span>
              </Link>
              <Link href="#" target="_blank">
                <span className="bg-slate-100 p-1 inline-flex items-center justify-center rounded-[5px] text-lg text-darkText hover:bg-orange-600 hover:text-white cursor-pointer duration-200">
                  <BsGithub />
                </span>
              </Link>
            </div>
          </div>
          <div className="">
            <p className="text-xl font-semibold select-none text-center md:text-start">Latest Posts</p>
            <ul className="text-sm font-light mt-5 flex flex-col gap-y-2 items-center md:items-start">
              <li className="flex flex-col">
                <span className="hover:text-orange-600 cursor-pointer duration-200">
                  Where Music Is Headed Next
                </span>
                <span className="text-orange-600">Janurary 31, 2022</span>
              </li>
              <li className="flex flex-col">
                <span className="hover:text-orange-600 cursor-pointer duration-200">
                  Where Music Is Headed Next
                </span>
                <span className="text-orange-600">Janurary 31, 2022</span>
              </li>
              <li className="flex flex-col">
                <span className="hover:text-orange-600 cursor-pointer duration-200">
                  Where Music Is Headed Next
                </span>
                <span className="text-orange-600">Janurary 31, 2022</span>
              </li>
              <li className="flex flex-col">
                <span className="hover:text-orange-600 cursor-pointer duration-200">
                  Where Music Is Headed Next
                </span>
                <span className="text-orange-600">Janurary 31, 2022</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-semibold select-none">My Account</p>
            <ul className="mt-5 flex flex-col gap-y-2 items-center md:items-start">
              <li className="text-lg font-medium hover:text-orange-600">
                <Link href="/">Home</Link>
              </li>
              <li className="text-lg font-medium hover:text-orange-600">
                <Link href="/cart">Cart</Link>
              </li>
              <li className="text-lg font-medium hover:text-orange-600">
                <Link href="/about">About</Link>
              </li>
              <li className="text-lg font-medium hover:text-orange-600">
                <Link href="/contact">contact</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-xl font-semibold select-none text-center md:text-start">Payment Partners</p>
            <div className="relative h-12 w-60 mt-5">
              <Image
                className="object-fill"
                src={paymentImage}
                alt="payament image"
                fill
              />
            </div>
          </div>
        </div>

        <div className="w-11/12 border border-slate-300/20 my-10 mx-auto" />

        <div className="w-full flex flex-col items-center gap-y-4 my-14">
            <Logo />
            <p>Copyright © 2024 DeewasShop. All Rights Reserved.</p>
            <p>Designed and Developed by</p>
            <p className="text-orange-600">Deewas Tamang</p>
        </div>

      </Container>
    </div>
  );
};

export default Footer;
