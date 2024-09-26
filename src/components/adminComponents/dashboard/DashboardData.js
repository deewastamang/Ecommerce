"use client";

import React from "react";
import DashboardCard from "./DashboardCard";
import { useGetOrderCountQuery, useGetProductCountQuery, useGetUserCountQuery } from "@/features/countSlice/count.slice";

const DashboardData = () => {

  const {data: orderCount, error: orderCountError, isLoading: orderCountLoading, refetch: orderCountRefetch } = useGetOrderCountQuery();
  const {data: userCount, error: userCountError, isLoading: userCountLoading, refetch: userCountRefetch } = useGetUserCountQuery();
  const {data: productCount, error: productCountError, isLoading: productCountLoading, refetch: productCountRefetch } = useGetProductCountQuery();


  return (
    <div className="py-4 mt-4">
      <section className="flex gap-x-8">
        <DashboardCard title={"Total Products"} value={productCount?.data}  />
        <DashboardCard title={"Total Orders"} value={orderCount?.data} />
        <DashboardCard title={"Total Users"} value={userCount?.data}  />
      </section>
    </div>
  );
};

export default DashboardData;
