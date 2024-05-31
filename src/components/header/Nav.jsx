import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ className, menuOpen }) => {
  const pathname = usePathname();

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Shop",
      path: "/products",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  return (
    <nav
      id="mega-menu"
      className={`${className} items-center justify-between w-full md:flex md:w-auto md:order-2 ${
        menuOpen ? "block" : "hidden"
      }`}
    >
      <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-2 lg:space-x-8 rtl:space-x-reverse gap-y-5 md:gap-y-0 py-5 md:py-0">
        {links.map((link) => (
          <li className="text-center md:text-start" key={link.title}>
            <Link
              href={link.path}
              className={
                pathname === link.path
                  ? "md:text-[1rem] lg:text-xl text-xl  font-medium text-orange-600"
                  : "md:text-[1rem] text-xl lg:text-xl font-medium hover:text-orange-300 duration-200"
              }
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

    </nav>
  );
};

export default Nav;
