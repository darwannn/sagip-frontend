import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Types
import type { User, TUserResData } from "../types/user";

import { API_BASE_URL } from "../api.config";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["User", "SelectedUser", "VerificationRequest"],
  endpoints: (builder) => ({
    getUsersData: builder.query<User[], void>({
      query: () => "account",
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, string | undefined>({
      query: (id) => `account/${id}`,
      providesTags: ["SelectedUser"],
    }),
    addUser: builder.mutation<
      TUserResData,
      { body: Record<string, any>; token: string | null }
    >({
      query: ({ body, token }) => ({
        url: "account/add",
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "SelectedUser", "VerificationRequest"],
    }),

    updateUser: builder.mutation<
      TUserResData,
      { body: Record<string, any>; token: string | null; id: string }
    >({
      query: ({ body, token, id }) => ({
        url: `account/info/update/${id}`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "SelectedUser", "VerificationRequest"],
    }),
    deleteUser: builder.mutation<void, { token: string | null; id: string }>({
      query: ({ token, id }) => ({
        url: `/account/archive/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "SelectedUser", "VerificationRequest"],
    }),
    /* verification request */
    getVerificationRequests: builder.query<User[], { token: string | null }>({
      query: ({ token }) => ({
        url: "auth/verification-request/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["VerificationRequest"],
    }),

    updateVerificationRequest: builder.mutation<
      User,
      {
        token: string | null;
        action: string;
        id: string;
      }
    >({
      query: ({ token, action, id }) => ({
        url: `/auth/verification-request/${action}/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["VerificationRequest"],
    }),
  }),
});

export const {
  useGetUsersDataQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetVerificationRequestsQuery,
  useUpdateVerificationRequestMutation,
} = usersApi;
