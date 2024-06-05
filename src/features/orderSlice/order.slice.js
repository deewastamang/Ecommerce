import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    // with serach query
    //   getOrders: builder.query({
    //     query: (searchParams) => `/orders/?email=${searchParams.email}`,
    //     keepUnusedDataFor: 0,
    //   }),
    getOrders: builder.query({
      query: () => "/orders",
      keepUnusedDataFor: 0,
    }),
    createOrder: builder.mutation({
      query: (newProduct) => ({
        url: "/orders",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderSlice;
