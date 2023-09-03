import { THazardReport } from "../types/hazardReport";
import { rootApi } from "./rootApi";

export const hazardReportsQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all hazard reports
    getHazardReports: builder.query<THazardReport[], void>({
      query: () => "hazard-report",
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "HazardReports", id: _id }))
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
        url: `hazard-report/update/verify/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, id) => {
        return [{ type: "HazardReports", id }];
      },
    }),
    // Resolve a hazard report
    resolveHazardReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `hazard-report/update/resolve/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, id) => {
        return [{ type: "HazardReports", id }];
      },
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
      invalidatesTags: (_result, _error, id) => {
        return [{ type: "HazardReports", id }];
      },
    }),

    // Get ongoing hazard reports
    getOngoingHazard: builder.query<THazardReport[], void>({
      query: () => "hazard-report/ongoing",
      providesTags: ["OngoingHazardReports"],
    }),
  }),
});

export const {
  useGetHazardReportsQuery,
  useGetHazardReportQuery,
  useVerifyHazardReportMutation,
  useResolveHazardReportMutation,
  useDeleteHazardReportMutation,

  useGetOngoingHazardQuery,
} = hazardReportsQueryApi;
