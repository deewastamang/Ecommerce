"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { FaRegUser as ProfileIcon } from "react-icons/fa";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { useSession, signIn } from "next-auth/react";
import ProfileDropDown from "../profileDropdown/ProfileDropdown";
import { toast } from "sonner";
import Nav from "./Nav";
import Cart from "./Cart";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteUser, addUser } from "@/features/shoppingSlice/shopping.slice";

const Header = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          userId: session?.user?.userId,
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    } else {
      dispatch(deleteUser());
    }
  }, [session, dispatch]);

  return (
    <main className="bg-bodyColor min-h-20 sticky top-0 z-50">
      <Container className="h-full flex md:flex-nowrap flex-wrap items-center md:gap-x-5 justify-between py-4">
        <Logo />

        {/* search field */}
        <div className=" bg-white w-[150px] lg:w-auto hidden md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-600 group md:order-3 overflow-hidden">
          <SearchIcon className="text-gray-500 group-focus-within:text-darkText duration-200" />
          <input
            className="placeholder:text-xs lg:placeholder:text-sm flex-1 outline-none"
            placeholder="Search for products"
            type="text"
          />
        </div>
        <div className="flex gap-x-4 md:order-4">
          {/* login / Register  */}
          {!session && (
            <Link
              href="/login"
              className="bg-bgLight text-gray-500 flex items-center justify-center px-4 py-2 rounded-full hover:bg-white border-[1px] border-gray-200 hover:border-orange-500 duration-200 gap-x-1.5 cursor-pointer"
            >
              <ProfileIcon className="text-xl" />
              <p className="text-sm font-semibold">Login</p>
            </Link>
          )}
          {/* cart button */}
          <Link
            href="/cart"
            className="bg-black hover:bg-slate-950  rounded-full text-slate-100 hover:text-white hidden md:flex items-center justify-center gap-x-1.5 px-1 lg:px-4 lg:py-2 cursor-pointer border border-black hover:border-orange-600 duration-200 relative"
          >
            <Cart />
          </Link>
          {/* user profile control */}
          <div className="flex items-center gap-x-4">
            {session && <ProfileDropDown user={session?.user} />}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mega-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>

        <Nav className="" menuOpen={menuOpen} />
      </Container>
    </main>
  );
};

export default Header;
