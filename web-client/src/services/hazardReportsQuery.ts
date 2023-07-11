import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";

import { THazardReport } from "../pages/HazardReports/types/hazardReport";

export const hazardReportsQueryApi = createApi({
  reducerPath: "facilityQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["HazardReports", "SelectedHazardReport"],
  endpoints: (builder) => ({
    // Get all hazard reports
    getHazardReports: builder.query<THazardReport[], void>({
      query: () => "hazard-report",
      providesTags: ["HazardReports"],
    }),
  }),
});

export const { useGetHazardReportsQuery } = hazardReportsQueryApi;
