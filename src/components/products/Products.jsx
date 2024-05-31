"use client";

import Container from "../header/Container";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";
import ProductData from "./ProductData";
import Loading from "@/app/loading";
import React, {useEffect} from "react";

const Products = () => {
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;
  return (
    <React.Fragment>
      <p className="text-5xl font-semibold text-orange-600 text-center py-10 select-none hover:text-orange-500">
        Our Collection
      </p>
      <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {products?.data?.map((item) => (
          <ProductData key={item._id} product={{ ...item }} />
        ))}
      </Container>
    </React.Fragment>
  );
};

export default Products;
