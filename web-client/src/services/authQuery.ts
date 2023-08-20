import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { TUserResData } from "../types/user";

import { API_BASE_URL } from "../api.config";

export const authQueryApi = createApi({
  reducerPath: "authQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["User", "SelectedUser"],
  endpoints: (builder) => ({
    register: builder.mutation<TUserResData, { body: Record<string, any> }>({
      query: ({ body }) => ({
        url: `/auth/register/`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    /* validate the inputted password / contact number / email address */
    validataInput: builder.mutation<
      TUserResData,
      { body: Record<string, any>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/auth/validate/${action}`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    /* archive the account if the provided password matches with the password in the database */
    passwordVerification: builder.mutation<
      TUserResData,
      { body: Record<string, any>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/auth/password-verification/${action}`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    /* verify if the code entered is correct */
    contactVerification: builder.mutation<
      TUserResData,
      { body: Record<string, any>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/auth/verification-code/${action}`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    /* sends a verification code to the entered email address/contact number  */
    sendVerificationCode: builder.mutation<
      TUserResData,
      { body: Record<string, any>; action: string }
    >({
      query: ({ body, action }) => ({
        url: `/account/update/${action}/send-code`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    /* resends verification code; the body will be used to determine whether 
    the code will be sent to the email address or contact number. */
    resendVerificationCode: builder.mutation<
      TUserResData,
      { body: Record<string, any> }
    >({
      query: ({ body }) => ({
        url: `/auth/resend-code/`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    forgotPassword: builder.mutation<
      TUserResData,
      { body: Record<string, any> }
    >({
      query: ({ body }) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    newPassword: builder.mutation<TUserResData, { body: Record<string, any> }>({
      query: ({ body }) => ({
        url: `/auth/new-password`,
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
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
