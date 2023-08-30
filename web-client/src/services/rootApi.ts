// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../api.config";

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  reducerPath: "rootApi",
  tagTypes: ["User", "SelectedUser", "VerificationRequest"],
  endpoints: () => ({}),
});
