import moment from "moment";
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
      transformResponse: (result: TAssistanceRequest[]) => {
        // Sort by date and status
        return result.sort(compareStatusAndDate);
      },
    }),
    getAssistanceRequestById: builder.query<TAssistanceRequest, string>({
      query: (id) => ({
        url: `assistance-request/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["SelectedAssistanceRequest"],
    }),
    // Dismiss an assistance request
    dismissAssistanceRequest: builder.mutation<
      TAssistanceReqResponse,
      { id: string; body: DismissBody }
    >({
      query: ({ id, body }) => ({
        url: `assistance-request/archive/${id}`,
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

    // Assign team to assistance request
    assignTeamToAssistanceRequest: builder.mutation<
      TAssistanceReqResponse,
      { id: string; teamId: string }
    >({
      query: ({ id, teamId }) => ({
        url: `assistance-request/update/verify/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { assignedTeam: teamId },
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [{ type: "AssistanceRequest", id }, "SelectedAssistanceRequest"];
      },
    }),

    /* Return only one current assistance request from the user with an unverified or ongoing status */
    getMyAssistanceRequest: builder.query<TAssistanceRequest, void>({
      query: () => ({
        url: "assistance-request/myrequest",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["MyAssistanceRequest"],
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

    addAssistanceRequest: builder.mutation<
      TAssistanceRequest,
      { body: FormData; action: string }
    >({
      query: ({ body, action }) => ({
        url: `assistance-request/${action}`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["MyAssistanceRequest"],
    }),

    updateAssistanceRequest: builder.mutation<
      TAssistanceRequest,
      { body: FormData; id: string }
    >({
      query: ({ body, id }) => ({
        url: `assistance-request/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["MyAssistanceRequest"],
    }),
    responderUpdateAssistanceRequest: builder.mutation<
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
        "OngoingAssistanceRequest",
        "ToRespondAssistanceRequest",
      ],
    }),

    deleteAssistanceRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `assistance-request/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["MyAssistanceRequest"],
    }),
  }),
});

export const {
  useGetAllAssistanceRequestsQuery,
  useGetAssistanceRequestByIdQuery,
  useDismissAssistanceRequestMutation,
  useAssignTeamToAssistanceRequestMutation,
  useGetMyAssistanceRequestQuery,
  useGetOngoingAssistanceRequestsQuery,
  useGetToRespondAssistanceRequestsQuery,
  useAddAssistanceRequestMutation,
  useUpdateAssistanceRequestMutation,
  useResponderUpdateAssistanceRequestMutation,
  useDeleteAssistanceRequestMutation,
} = assistanceRequestQueryApi;

const statusOrder = ["unverified", "ongoing", "resolved"];
// Custom comparison function for sorting
function compareStatusAndDate(a: TAssistanceRequest, b: TAssistanceRequest) {
  const statusA = a.status;
  const statusB = b.status;

  // Find the index of each status in the desired order
  const indexA = statusOrder.indexOf(statusA);
  const indexB = statusOrder.indexOf(statusB);

  // Compare the indices first
  if (indexA !== indexB) {
    return indexA - indexB;
  }

  // If statuses are the same, compare the "date" in descending order
  const dateA = moment(a.createdAt);
  const dateB = moment(b.createdAt);

  return dateB.diff(dateA); // Sort in descending order of date
}
