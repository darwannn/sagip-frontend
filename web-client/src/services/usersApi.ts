import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Types
import type { User } from "../types/user";

import { API_BASE_URL } from "../api.config";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
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
