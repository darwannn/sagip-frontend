import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User, TUserResData } from "../types/user";

import { API_BASE_URL } from "../api.config";

export const accountQueryApi = createApi({
  reducerPath: "accountQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserByToken: builder.query<User, void>({
      query: () => ({
        url: "account/myprofile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        providesTags: ["User"],
      }),
    }),

    updateProfile: builder.mutation<
      TUserResData,
      { body: FormData; id: string | undefined }
    >({
      query: ({ body, id }) => ({
        url: `account/profile/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation<
      TUserResData,
      { body: Record<string, any> }
    >({
      query: ({ body }) => ({
        url: `/account/new-password`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),

    /* archives the account */
    deleteAccount: builder.mutation<TUserResData, void>({
      query: () => ({
        url: `account/myaccount/archive`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByTokenQuery,
  useUpdateProfileMutation,

  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = accountQueryApi;
