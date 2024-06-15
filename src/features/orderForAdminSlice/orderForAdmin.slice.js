import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderForAdminSlice = createApi({
  reducerPath: "orderForAdmin",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    // with serach query
    getOrdersByProductForAdmin: builder.query({
      query: () => `/ordersByProductForAdmin`,
      keepUnusedDataFor: 0,
    }),
    getOrdersByUserForAdmin: builder.query({
      query: () => "/ordersByUserForAdmin",
      keepUnusedDataFor: 0,
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 0,
    }),
    updateOrderData: builder.mutation({
      query: ({_id, ...updatedOrderData}) => ({
        url: `/orders/${_id}`,
        method: "PUT",
        body: updatedOrderData,
      })
    })
  }),
});

export const {
  useGetOrdersByProductForAdminQuery,
  useGetOrdersByUserForAdminQuery,
  useGetAllUsersQuery,
  useUpdateOrderDataMutation,
} = orderForAdminSlice;
