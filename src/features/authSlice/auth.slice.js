import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "login/signup",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (info) => ({
        url: "/signup",
        method: "POST",
        body: info,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getSingleUser: builder.query({
      query: (_id) => `/users/${_id}`,
      keepUnusedDataFor: 0,
    }),
    updateUser: builder.mutation({
      query: ({_id, ...newUserData}) => ({
        url: `/users/${_id}`,
        method: "PUT",
        body: newUserData,
      })
    })
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = authSlice;
