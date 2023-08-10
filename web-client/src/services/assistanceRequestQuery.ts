import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../api.config";
import { TAssistanceRequest } from "../pages/EmergencyReports/types/assistanceRequest";

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
    }),
  }),
});

export const { useGetAllAssistanceRequestsQuery } = assistanceRequestQueryApi;
