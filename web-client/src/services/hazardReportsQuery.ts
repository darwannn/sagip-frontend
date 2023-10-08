import { THazardReport, THazardReportResData } from "../types/hazardReport";
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

    //TODO, create a seperate query for archiving hazard report(will be used in management page)

    // Delete a hazard report (used in mobile, when user want to cancel their report)
    deleteHazardReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `hazard-report/delete/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, id) => {
        return [
          { type: "HazardReports", id },
          { type: "MyHazardReports", id },
        ];
      },
    }),

    // Get ongoing hazard reports
    getOngoingHazard: builder.query<THazardReport[], void>({
      query: () => "hazard-report/ongoing",
      providesTags: ["OngoingHazardReports"],
    }),
    // Get  unverified hazard report of current logged-in user
    getMyHazardReport: builder.query<THazardReport[], void>({
      query: () => ({
        url: "hazard-report/myreport",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "MyHazardReports", id: _id }))
          : ["MyHazardReports"],
    }),

    addHazardReport: builder.mutation<THazardReportResData, FormData>({
      query: (body) => ({
        url: `hazard-report/add/`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["MyHazardReports"],
    }),

    updateHazardReport: builder.mutation<
      THazardReportResData,
      { body: FormData; id: string }
    >({
      query: ({ body, id }) => ({
        url: `hazard-report/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      /* invalidatesTags: (_result, _error, { id }) => [
        { type: "MyHazardReports", id },
      ], */
      invalidatesTags: ["MyHazardReports"],
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
  useGetMyHazardReportQuery,
  useAddHazardReportMutation,
  useUpdateHazardReportMutation,
} = hazardReportsQueryApi;
