import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { TUserResData, User } from "../types/user";

import { API_BASE_URL } from "../api.config";

export const authQueryApi = createApi({
  reducerPath: "authQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["User", "SelectedUser"],
  endpoints: (builder) => ({
    register: builder.mutation<TUserResData, User>({
      query: (body) => ({
        url: `/auth/register/`,
        method: "POST",
        body,
      }),
    }),

    /* validate the inputted password / contact number / email address */
    validataInput: builder.mutation<
      TUserResData,
      { body: Partial<User>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/auth/validate/${action}`,
        method: "POST",
        body,
      }),
    }),
    /* archive the account if the provided password matches with the password in the database */
    passwordVerification: builder.mutation<
      TUserResData,
      { body: Partial<User>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/auth/password-verification/${action}`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    /* verify if the code entered is correct */
    contactVerification: builder.mutation<
      TUserResData,
      {
        code: number | string;
        contactNumber: string;
        email: string;
        action: string;
      }
    >({
      query: ({ code, contactNumber, email, action }) => ({
        url: `/auth/verification-code/${action}`,
        method: "PUT",
        body: { code, contactNumber, email, action },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    /* sends a verification code to the entered email address/contact number  */
    sendVerificationCode: builder.mutation<
      TUserResData,
      { body: Partial<User>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/account/update/${action}/send-code`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    /* resends verification code; the body will be used to determine whether 
    the code will be sent to the email address or contact number. */
    resendVerificationCode: builder.mutation<
      TUserResData,
      {
        identifier: string;
      }
    >({
      query: ({ identifier }) => ({
        url: `/auth/resend-code/`,
        method: "PUT",
        body: { identifier },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    forgotPassword: builder.mutation<TUserResData, { identifier: string }>({
      query: ({ identifier }) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: { identifier },
      }),
    }),
    newPassword: builder.mutation<
      TUserResData,
      {
        password: string;
        confirmPassword: string;
        target: string;
      }
    >({
      query: ({ password, target, confirmPassword }) => ({
        url: `/auth/new-password`,
        method: "PUT",
        body: {
          password,
          confirmPassword,
          target,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useValidataInputMutation,
  usePasswordVerificationMutation,
  useContactVerificationMutation,
  useSendVerificationCodeMutation,
  useResendVerificationCodeMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
} = authQueryApi;
