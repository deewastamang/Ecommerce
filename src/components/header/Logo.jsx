import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <h3 className="inline text-2xl font-semibold hover:text-orange-500 cursor-poiner duration-200 whitespace-nowrap">Deewas Shop</h3>
    </Link>
  );
};

export default Logo;
