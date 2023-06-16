import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Types
import type { User } from "../types/user";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsersData: builder.query<User[], void>({
      query: () => "account",
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `account/${id}`,
    }),
  }),
});

export const { useGetUsersDataQuery, useLazyGetUserByIdQuery } = usersApi;
