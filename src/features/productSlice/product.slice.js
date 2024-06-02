import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      keepUnusedDataFor: 0,
    }),
    // getProduct: builder.query({  //using search query parameter
    //     query: (searchParams) => `/product/?_id=${searchParams._id}`
    // }),
    getSingleProduct: builder.query({
      query: (_id) => `/products/${_id}`,
      keepUnusedDataFor: 0,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
    }),
    deleteSingleProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ _id, ...updatedProduct }) => ({
        url: `/products/${_id}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteSingleProductMutation,
  useUpdateProductMutation,
} = productSlice;
