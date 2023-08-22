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

    updateProfilePicture: builder.mutation<TUserResData, { body: FormData }>({
      query: ({ body }) => ({
        url: `account/update/profile-picture/`,
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
      {
        password: string;
        confirmPassword: string;
        oldPassword: string;
      }
    >({
      query: ({ password, confirmPassword, oldPassword }) => ({
        url: `/account/new-password`,
        method: "PUT",
        body: {
          password,
          confirmPassword,
          oldPassword,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  useUpdateProfilePictureMutation,

  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = accountQueryApi;
