import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";

import { THazardReport } from "../pages/HazardReports/types/hazardReport";

export const hazardReportsQueryApi = createApi({
  reducerPath: "hazardReportsQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["HazardReports", "SelectedHazardReport"],
  endpoints: (builder) => ({
    // Get all hazard reports
    getHazardReports: builder.query<THazardReport[], void>({
      query: () => "hazard-report",
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "HazardReports", _id }))
          : ["HazardReports"],
    }),
    // Get a single hazard report
    getHazardReport: builder.query<THazardReport, string>({
      query: (id) => `hazard-report/${id}`,
      providesTags: ["HazardReports"],
    }),
    // Verify a hazard report
    verifyHazardReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `hazard-report/verify/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: "HazardReports", id }],
    }),
    // Resolve a hazard report
    resolveHazardReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `hazard-report/resolve/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: "HazardReports", id }],
    }),
    // Delete a hazard report
    deleteHazardReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `hazard-report/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: "HazardReports", id }],
    }),
  }),
});

export const {
  useGetHazardReportsQuery,
  useGetHazardReportQuery,
  useVerifyHazardReportMutation,
  useResolveHazardReportMutation,
  useDeleteHazardReportMutation,
} = hazardReportsQueryApi;
