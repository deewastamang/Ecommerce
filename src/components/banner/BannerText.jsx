"use client";
import React from "react";
import Container from "../header/Container";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BannerText = ({ title, description, firstButtonLink, secondButtonLink }) => {
    const router = useRouter();
  return (
    <div className=" absolute top-0 left-0 w-full h-full ">
      <Container className="flex flex-col gap-y-6 justify-center items-center md:items-start h-full">
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:text-7xl text-6xl font-bold text-white"
        >
          {title}
        </motion.p>
        <motion.p
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:text-lg text-md text-slate-100 max-w-lg"
        >
            {description}
        </motion.p>
        <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex gap-x-4 mt-2"
        >
            <button onClick={() => router.push(firstButtonLink)} className="py-3 px-6 rounded-full bg-slate-200 hover:bg-white duration-200 text-sm uppercase font-semibold">Find out more</button>
            <button onClick={() => router.push(secondButtonLink)} className="py-3 px-6 rounded-full bg-slate-200 hover:bg-white duration-200 text-sm uppercase font-semibold">Shop now</button>
        </motion.div>
      </Container>
    </div>
  );
};

export default BannerText;
