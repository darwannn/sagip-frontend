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
  }),
});

export const { useGetHazardReportsQuery } = hazardReportsQueryApi;
