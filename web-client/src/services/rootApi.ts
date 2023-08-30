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
    // ACCOUNT QUERY
    "Account",
    // TEAMS QUERY
    "Teams",
    "Responders",
    "ActiveTeams",
    // RESPONDER QUERY
    "Responders",
    // EMERGENCY QUERY
    "AssistanceRequest",
    // FACILITY QUERY
    "Facility",
    "SelectedFacility",
    // HAZARD REPORT QUERY
    "HazardReports",
    "SelectedHazardReport",
    // ALERT QUERY
    "Alert",
    "SelectedAlert",
    "ActiveAlert",
    "AlertReport",
    // ARTICLE QUERY
    "Article",
    "SelectedArticle",
  ],
  endpoints: () => ({}),
});
