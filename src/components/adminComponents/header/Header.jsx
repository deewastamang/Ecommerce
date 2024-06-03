"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import LabelIcon from "./LabelIcon";

const header = () => {
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
      icon: <CiSettings />,
    },
  ];
  return (
    <aside className="h-full w-full">
      <p className="flex justify-center text-xl text-orange-600 select-none py-1 gap-x-1">
        <MdOutlineAdminPanelSettings className="text-3xl" />
        Shop Admin Panel
      </p>
      <ul className="flex flex-col items-center gap-y-2 mt-4">
        {adminLinks?.map((item) => (
          <li
            key={item?.title}
            className={
              pathname === item.path
                ? "bg-main-bg rounded-l-xl w-full py-2"
                : "w-full py-2"
            }
          >
            <Link
              href={item.path}
              className={
                pathname === item.path
                  ? "flex justify-start text-md items-center gap-x-2 text-black ml-4"
                  : "flex justify-start text-md items-center gap-x-2 text-slate-100 ml-4"
              }
            >
              <LabelIcon className="text-xl">{item.icon}</LabelIcon>

              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default header;
