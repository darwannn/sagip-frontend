import { rootApi } from "./rootApi";
import { TSMSResData } from "../types/survey";
import { SMSAlertTemplate, SMSAlert } from "../types/alert";

export const alertQuery = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendAlert: builder.mutation<TSMSResData, SMSAlert>({
      query: ({ alertTitle, alertMessage, location }) => ({
        url: `alert/sms/send`,
        method: "POST",
        body: {
          alertTitle,
          alertMessage,
          location,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getAlertTemplates: builder.query<SMSAlertTemplate[], void>({
      query: () => ({
        url: `alert/sms`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "Templates", id: _id }))
          : ["Templates"],
    }),
    addAlertTemplate: builder.mutation<
      SMSAlertTemplate,
      Partial<SMSAlertTemplate>
    >({
      query: (body) => ({
        url: `alert/sms/add`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Templates"],
    }),
    deleteAlertTemplate: builder.mutation<SMSAlertTemplate, { id: string }>({
      query: ({ id }) => ({
        url: `alert/sms/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Templates", id }],
    }),
    editAlertTemplate: builder.mutation<
      SMSAlertTemplate,
      { id: string; body: Partial<SMSAlertTemplate> }
    >({
      query: ({ id, body }) => ({
        url: `alert/sms/edit/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Templates", id }],
    }),
  }),
});

export const {
  useSendAlertMutation,
  useGetAlertTemplatesQuery,
  useAddAlertTemplateMutation,
  useDeleteAlertTemplateMutation,
  useEditAlertTemplateMutation,
} = alertQuery;
