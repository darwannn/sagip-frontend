import {
  TAssistanceReqResponse,
  TAssistanceRequest,
} from "../types/assistanceRequest";
import { rootApi } from "./rootApi";

type DismissBody = {
  reason: string;
  note?: string;
};

export const assistanceRequestQueryApi = rootApi.injectEndpoints({
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

    getOngoingAssistanceRequests: builder.query<TAssistanceRequest[], void>({
      query: () => ({
        url: `assistance-request/ongoing`,
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({
              type: "OngoingAssistanceRequest",
              id: _id,
            }))
          : ["OngoingAssistanceRequest"],
    }),

    getToRespondAssistanceRequests: builder.query<TAssistanceRequest[], void>({
      query: () => ({
        url: `assistance-request/torespond`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({
              type: "ToRespondAssistanceRequest",
              id: _id,
            }))
          : ["ToRespondAssistanceRequest"],
    }),

    updateAssistanceRequest: builder.mutation<
      TAssistanceRequest,
      { action: string; id: string }
    >({
      query: ({ action, id }) => ({
        url: `assistance-request/update/${action}/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [
        "AssistanceRequest",
        "OngoingAssistanceRequest",
        "ToRespondAssistanceRequest",
      ],
    }),
  }),
});

export const {
  useGetAllAssistanceRequestsQuery,
  useGetAssistanceRequestByIdQuery,
  useDismissAssistanceRequestMutation,

  useGetOngoingAssistanceRequestsQuery,
  useGetToRespondAssistanceRequestsQuery,

  useUpdateAssistanceRequestMutation,
} = assistanceRequestQueryApi;
