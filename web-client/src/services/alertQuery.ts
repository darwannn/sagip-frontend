import {
  TSurvey,
  TActiveSurvey,
  TSMSResData,
  TSurveyResData,
  TSignalResData,
  TWeatherResData,
} from "../types/alert";
import { rootApi } from "./rootApi";

export const alertQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlerts: builder.query<TSurvey[], void>({
      query: () => "wellness-survey",
      providesTags: ["Alert"],
    }),
    // Get specific article with id
    getAlertById: builder.query<TSurvey, string | undefined>({
      query: (id) => `wellness-survey/${id}`,
      providesTags: ["SelectedAlert"],
    }),
    getActiveAlert: builder.query<TActiveSurvey, void>({
      query: () => `wellness-survey/active`,
      providesTags: ["ActiveAlert"],
    }),

    getAlertReportById: builder.query<TSurvey, string | undefined>({
      query: (id) => `wellness-survey/report/${id}`,
      providesTags: ["AlertReport"],
    }),

    sendAlert: builder.mutation<
      TSMSResData,
      {
        alertTitle: string;
        alertMessage: string;

        location: string[];
      }
    >({
      query: ({ alertTitle, alertMessage, location }) => ({
        url: `api/send-alert/`,
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

    addAlert: builder.mutation<TSurveyResData, Partial<TSurvey>>({
      query: (body) => ({
        url: "wellness-survey/add",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Alert", "ActiveAlert"],
    }),

    // Update article
    updateAlert: builder.mutation<
      TSurveyResData,
      { body: Partial<TSurvey>; id: string }
    >({
      query: ({ body, id }) => ({
        url: `wellness-survey/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Alert", "SelectedAlert", "ActiveAlert"],
    }),

    deleteAlert: builder.mutation<void, { token: string | null; id: string }>({
      query: ({ token, id }) => ({
        url: `wellness-survey/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Alert", "ActiveAlert"],
    }),

    getSignalAlert: builder.query<TSignalResData, void>({
      query: () => "alert/signal",
    }),
    getWeatherAlert: builder.query<TWeatherResData, void>({
      query: () => "alert/weather",
    }),

    /* Checks if user already answered the survey */
    getCheckActiveSurvey: builder.query<TActiveSurvey, void>({
      query: () => ({
        url: `wellness-survey/myresponse`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["CheckActiveSurvey"],
    }),

    answerSurvey: builder.mutation<TSurveyResData, string>({
      query: (answer) => ({
        url: `wellness-survey/answer/`,
        method: "PUT",
        body: { answer },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["CheckActiveSurvey"],
    }),
  }),
});

export const {
  useSendAlertMutation,
  useGetAlertsQuery,
  useGetAlertByIdQuery,
  useGetActiveAlertQuery,
  useDeleteAlertMutation,
  useAddAlertMutation,
  useUpdateAlertMutation,
  useGetAlertReportByIdQuery,

  useGetSignalAlertQuery,
  useGetWeatherAlertQuery,

  useGetCheckActiveSurveyQuery,
  useAnswerSurveyMutation,
} = alertQueryApi;
