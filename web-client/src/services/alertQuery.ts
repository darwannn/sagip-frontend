import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";
import { TSurvey, TActiveSurvey, TSMSResData,TSurveyResData } from "../pages/AlertsManagement/types/alert";

export const alertQueryApi = createApi({
  reducerPath: "alertQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Alert", "SelectedAlert","ActiveAlert","AlertReport"],
  endpoints: (builder) => ({
    getAlerts: builder.query<TSurvey[], void>({
      query: () => "wellness-survey",
      providesTags: ["Alert"],
    }),
    // Get specific article with id
    getAlertById: builder.query<TSurvey, string | undefined>({
      query: (id) => `wellness-survey/${id}`,
      providesTags: ["SelectedAlert"],
    }),
    getActiveAlert: builder.query<TActiveSurvey, void>({
      query: () => `wellness-survey/active`,
      providesTags: ["ActiveAlert"],
    }),
  
    getAlertReportById: builder.query<TSurvey, string | undefined>({
      query: (id) => `wellness-survey/report/${id}`,
      providesTags: ["AlertReport"],
    }),
    sendAlert: builder.mutation<TSMSResData, { body: Record<string, any>; token: string | null }>({
      query: ({ body, token }) => ({
        url: `api/send-alert/`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      }),
    }),
    addAlert: builder.mutation<
      TSurveyResData,
      { body:  Record<string, any>; token: string | null }
    >({
      query: ({ body, token }) => ({
        url: "wellness-survey/add",
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Alert", "ActiveAlert"],
    }),
    // Update article
    updateAlert: builder.mutation<
      TSurveyResData,
      { body:  Record<string, any>; token: string | null; id: string }
    >({
      query: ({ body, token, id }) => ({
        url: `wellness-survey/update/${id}`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Alert", "SelectedAlert", "ActiveAlert"],
    }),
    deleteAlert: builder.mutation<void, { token: string | null; id: string }>(
      {
        query: ({ token, id }) => ({
          url: `wellness-survey/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Alert", "ActiveAlert"],
      }
    ),
  }),
});

export const {
  useSendAlertMutation,
  useGetAlertsQuery,
  useGetAlertByIdQuery,
  useGetActiveAlertQuery,
  useDeleteAlertMutation,
  useAddAlertMutation,
  useUpdateAlertMutation,
  useGetAlertReportByIdQuery
} = alertQueryApi;
