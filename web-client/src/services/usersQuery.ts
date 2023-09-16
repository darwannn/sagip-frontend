import { rootApi } from "./rootApi";
// Types
import type { User, TUserResData } from "../types/user";

export const usersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersData: builder.query<User[], void>({
      query: () => "account",
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "User", id: _id }))
          : ["User"],
    }),
    getUserById: builder.query<User, string | undefined>({
      query: (id) => `account/${id}`,
      providesTags: ["SelectedUser"],
    }),
    addUser: builder.mutation<TUserResData, Partial<User>>({
      query: (body) => ({
        url: "account/add",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["User", "SelectedUser", "VerificationRequest"],
    }),

    updateUser: builder.mutation<
      TUserResData,
      { body: Partial<User>; id: string }
    >({
      query: ({ body, id }) => ({
        url: `account/info/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // invalidatesTags: ["User", "SelectedUser", "VerificationRequest"],
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        "SelectedUser",
        "VerificationRequest",
      ],
    }),
    archiveUser: builder.mutation<void, { action: string | null; id: string }>({
      query: ({ action, id }) => ({
        url: `/account/${action}/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // invalidatesTags: ["User", "SelectedUser", "VerificationRequest"],
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        "SelectedUser",
        "VerificationRequest",
      ],
    }),
    resetPassword: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/account/reset-password/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        "SelectedUser",
        "VerificationRequest",
      ],
    }),
    /* verification request */
    getVerificationRequests: builder.query<User[], { token: string | null }>({
      query: ({ token }) => ({
        url: "auth/verification-request/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "VerificationRequest", id: _id }))
          : ["VerificationRequest"],
    }),
    updateVerificationRequest: builder.mutation<
      User,
      {
        token: string | null;
        action: string;
        id: string;
      }
    >({
      query: ({ token, action, id }) => ({
        url: `/auth/verification-request/${action}/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "VerificationRequest", id },
      ],
    }),
  }),
});

export const {
  useGetUsersDataQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useArchiveUserMutation,
  useResetPasswordMutation,
  useGetVerificationRequestsQuery,
  useUpdateVerificationRequestMutation,
} = usersApi;
