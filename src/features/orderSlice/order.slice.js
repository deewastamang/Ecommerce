import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    // with serach query
      getOrders: builder.query({
        query: (searchParams) => `/orders/?userId=${searchParams.userId}`,
        keepUnusedDataFor: 0,
      }),
    createOrder: builder.mutation({
      query: (newProduct) => ({
        url: "/orders",
        method: "POST",
        body: newProduct,
      }),
    }),
    getWishlist: builder.query({
      query: (searchParams) => `/wishlist/?userId=${searchParams.userId}`,
      keepUnusedDataFor: 0,
    }),
    addWish: builder.mutation({
      query: (newWish) => ({
        url: "/wishlist",
        method: "POST",
        body: newWish,
      }),
    }),
    removeWish: builder.mutation({
      query: ({userId, wishId}) => ({
        url: `/wishlist/?userId=${userId}&wishId=${wishId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useGetWishlistQuery, useAddWishMutation, useRemoveWishMutation } = orderSlice;
