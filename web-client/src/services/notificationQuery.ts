import { TUserNotification } from "../types/notification";
import { rootApi } from "./rootApi";

export const notificationQuery = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotification: builder.query<TUserNotification[], void>({
      query: () => ({
        url: `notification`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "Notification", id: _id }))
          : ["Notification"],
    }),
    readUserNotification: builder.mutation<
      { success: boolean; message: string },
      void
    >({
      query: () => ({
        url: `notification/read`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetUserNotificationQuery, useReadUserNotificationMutation } =
  notificationQuery;
