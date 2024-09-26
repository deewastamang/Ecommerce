import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countSlice = createApi({
  reducerPath: "count",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    // with serach query
    getOrderCount: builder.query({
      query: () => `/orderCount`,
      keepUnusedDataFor: 0,
    }),
    getProductCount: builder.query({
      query: () => `/productCount`,
      keepUnusedDataFor: 0,
    }),
    getUserCount: builder.query({
      query: () => `/userCount`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetOrderCountQuery,
  useGetProductCountQuery,
  useGetUserCountQuery
} = countSlice;
