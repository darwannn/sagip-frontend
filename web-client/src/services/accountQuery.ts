import type { User, TUserResData } from "../types/user";
import type { TDashboard } from "../pages/Admin/Dashboard/types/dashboard";
import { rootApi } from "./rootApi";

export const accountQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByToken: builder.query<User, void>({
      query: () => ({
        url: "account/myprofile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        providesTags: ["Account"],
      }),
    }),

    updateProfile: builder.mutation<
      TUserResData,
      { body: FormData; id: string | undefined }
    >({
      query: ({ body, id }) => ({
        url: `account/profile/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Account"],
    }),

    updateProfilePicture: builder.mutation<TUserResData, { body: FormData }>({
      query: ({ body }) => ({
        url: `account/update/profile-picture/`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Account"],
    }),

    updatePassword: builder.mutation<
      TUserResData,
      {
        password: string;
        confirmPassword: string;
        oldPassword: string;
      }
    >({
      query: ({ password, confirmPassword, oldPassword }) => ({
        url: `/account/new-password`,
        method: "PUT",
        body: {
          password,
          confirmPassword,
          oldPassword,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Account"],
    }),

    /* archives the account */
    deleteAccount: builder.mutation<TUserResData, void>({
      query: () => ({
        url: `account/myaccount/archive`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Account"],
    }),

    getStatistics: builder.query<TDashboard, void>({
      query: () => ({
        url: "statistics/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserByTokenQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,

  useGetStatisticsQuery,
} = accountQueryApi;
