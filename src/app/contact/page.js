"use client";

import Image from "next/image";
import React from "react";
import contactImage from "@/../../public/assets/images/contactImage.png";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!")
    return

  }
  return (
    <div>
      <div className="ml-32 mt-10 text-3xl font-semibold text-orange-600">Contact us</div>
      <section className="lg:flex lg:gap-5 h-[85dvh]">
        <div className="img-container flex-1 lg:flex justify-center items-center hidden  ">
          <div className="img-wrapper relative size-[500px]">
            <Image src={contactImage} alt="image" />
          </div>
        </div>

        <div className="form-containe flex-1 h-full bg-[url('https://img.freepik.com/premium-photo/abstract-background-design-images-wallpaper-ai-generated_643360-162880.jpg?size=626&ext=jpg&ga=GA1.1.166499958.1714453350&semt=ais')] bg-cover lg:bg-none">
          <form className="space-y-4 h-full flex flex-col justify-center items-center lg:items-start" onSubmit={handleSubmit}>
            <input
              className="block px-3 py-4 rounded-[5px] w-4/6 bg-slate-100 border-2 border-orange-600 text-black"
              placeholder="Name and surname"
              type="text"
              name="fname"
            />
            <input
              className="block px-3 py-4 rounded-[5px] w-4/6 bg-slate-100 border-2 border-orange-600 text-black "
              placeholder="Email address"
              type="email"
              name="email"
            />
            <input
              className="block px-3 py-4 rounded-[5px] w-4/6 bg-slate-100 border-2 border-orange-600 text-black"
              placeholder="Phone number"
              type="number"
              name="phone"
            />
            <textarea
              className="block text-black h-40 w-4/6 bg-slate-100 border-2 border-orange-600 rounded-[5px] px-3 py-4"
              placeholder="Message"
              type="text"
              name="message"
            />
            <button
              type="submit"
              className="block px-3 py-4 rounded-[5px] w-4/6 bg-orange-600 text-white hover:bg-orange-700 hover:text-slate-100 focus:ring focus:ring-white"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
