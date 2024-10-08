"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import LabelIcon from "./LabelIcon";

const Header = () => {
  const pathname = usePathname();

  const adminLinks = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <AiOutlineProduct />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaTasks />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <FiSettings />,
    },
  ];
  return (
    <aside className="h-full w-full">
      <p className="flex justify-center text-xl text-gray-400 select-none py-1 gap-x-1">
        <MdOutlineAdminPanelSettings className="text-3xl" />
        Shop Admin Panel
      </p>
      <ul className="flex flex-col items-center gap-y-2 mt-4">
        {adminLinks?.map((item) => (
          <li
            key={item?.title}
            className={
              pathname === item.path
                ? "bg-gray-300 rounded-l-xl w-full py-3"
                : "w-full py-3"
            }
          >
            <Link
              href={item.path}
              className={
                pathname === item.path
                  ? "flex justify-start items-center gap-x-2 ml-4 font-semibold text-sm"
                  : "flex justify-start text-sm font-semibold items-center gap-x-2 ml-4"
              }
            >
              <LabelIcon className="text-xl ">{item.icon}</LabelIcon>

              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Header;
