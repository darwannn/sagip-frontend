import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../api.config";
import {
  TAssistanceReqResponse,
  TAssistanceRequest,
} from "../pages/EmergencyReports/types/assistanceRequest";

type DismissBody = {
  reason: string;
  note?: string;
};

export const assistanceRequestQueryApi = createApi({
  reducerPath: "assistanceRequestQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["AssistanceRequest"],
  endpoints: (builder) => ({
    getAllAssistanceRequests: builder.query<TAssistanceRequest[], void>({
      query: () => ({
        url: `assistance-request`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "AssistanceRequest", id: _id }))
          : ["AssistanceRequest"],
    }),
    getAssistanceRequestById: builder.query<TAssistanceRequest, string>({
      query: (id) => ({
        url: `assistance-request/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    // Dismiss an assistance request
    dismissAssistanceRequest: builder.mutation<
      TAssistanceReqResponse,
      { id: string; body: DismissBody }
    >({
      query: ({ id, body }) => ({
        url: `assistance-request/delete/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [{ type: "AssistanceRequest", id }];
      },
    }),
  }),
});

export const {
  useGetAllAssistanceRequestsQuery,
  useGetAssistanceRequestByIdQuery,
  useDismissAssistanceRequestMutation,
} = assistanceRequestQueryApi;
