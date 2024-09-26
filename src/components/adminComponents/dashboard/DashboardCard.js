import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

const DashboardCard = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-y-5 w-64 h-32 bg-gray-200 py-3 px-5 rounded-[3px]"
    >
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-4xl font-medium">
        <AnimatedCounter from={0} to={value} />
      </div>
    </motion.div>
  );
};

export default DashboardCard;
