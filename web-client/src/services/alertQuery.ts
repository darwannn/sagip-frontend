import { TSignalResData, TWeatherResData } from "../types/alert";

import { rootApi } from "./rootApi";
import { TActiveSurvey, TSMSResData, TSurveyResData } from "../types/survey";
import { SMSAlertTemplate, SMSAlert, SMSAlertRes } from "../types/alert";

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
    addAlertTemplate: builder.mutation<SMSAlertRes, Partial<SMSAlertTemplate>>({
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
        url: `alert/sms/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Templates", id }],
    }),

    getSignalAlert: builder.query<TSignalResData, void>({
      query: () => "alert/signal",
    }),
    getWeatherAlert: builder.query<TWeatherResData, void>({
      query: () => "alert/weather",
    }),
  }),
});

export const {
  useSendAlertMutation,
  useGetSignalAlertQuery,
  useGetWeatherAlertQuery,
  useGetAlertTemplatesQuery,
  useAddAlertTemplateMutation,
  useDeleteAlertTemplateMutation,
  useEditAlertTemplateMutation,
} = alertQuery;
