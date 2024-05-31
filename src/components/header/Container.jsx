import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={` max-w-screen-xl mx-auto px-4 xl:px-0 py-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
