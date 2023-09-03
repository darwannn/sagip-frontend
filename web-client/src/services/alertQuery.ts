import { rootApi } from "./rootApi";
import { TSMSResData } from "../types/survey";
import { SMSAlerTemplate, SMSAlert } from "../types/alert";

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
    getAlertTemplates: builder.query<SMSAlerTemplate[], void>({
      query: () => ({
        url: `alert/sms`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { useSendAlertMutation, useGetAlertTemplatesQuery } = alertQuery;
