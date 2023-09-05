import { NotificationRes } from "../types/notification";
import { rootApi } from "./rootApi";

export const notificationQuery = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotification: builder.query<NotificationRes, void>({
      query: () => ({
        url: `notification`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // providesTags: (result) =>
      //   result
      //     ? result.map(({ _id }) => ({ type: "Notification", id: _id }))
      //     : ["Notification"],
    }),
  }),
});

export const { useGetUserNotificationQuery } = notificationQuery;
