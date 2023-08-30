// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../api.config";

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  reducerPath: "rootApi",
  tagTypes: [
    // USER QUERY
    "User",
    "SelectedUser",
    "VerificationRequest",
    // TEAMS QUERY
    "Teams",
    "Responders",
    "ActiveTeams",
    // EMERGENCY QUERY
    "AssistanceRequest",
    // FACILITY QUERY
    "Facility",
    "SelectedFacility",
  ],
  endpoints: () => ({}),
});
