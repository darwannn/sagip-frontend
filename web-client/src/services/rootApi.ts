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
    "SelectedVerificationRequest",
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
    "OngoingAssistanceRequest",
    "ToRespondAssistanceRequest",
    // FACILITY QUERY
    "Facility",
    "SelectedFacility",
    // HAZARD REPORT QUERY
    "HazardReports",
    "SelectedHazardReport",
    "OngoingHazardReports",
    // ALERT QUERY
    "Alert",
    "SelectedAlert",
    "ActiveAlert",
    "AlertReport",
    // ARTICLE QUERY
    "Article",
    "SelectedArticle",
    "SavedArticle",
    "PublishedArticle",
    "SelectedPublishedArticle",
    // SURVEY QUERY
    "WellnessSurvey",
    "SelectedSurvey",
    "ActiveSurvey",
    "SurveyReport",
    "CheckActiveSurvey",
    // ALERT QUERY
    "Templates",
    // USER NOTIFICATION
    "Notification",
  ],
  endpoints: () => ({}),
});
