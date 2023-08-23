import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Types
import type { AuthType as AuthState } from "../../types/auth";
import type { TUserResData } from "../../types/user";

const initialState: AuthState = {
  token: null,

  passwordVerificationRes: null,
  contactVerificationRes: null,
  identifier: null,
  newPasswordRes: null,
  displayedRegisterPage: null,
  displayedVerificationPage: null,

  registrationSuccessful: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      localStorage.clear();
      // Store token and user in state / redux slice
      state.token = action.payload.token;
      // Store token in local storage
      localStorage.setItem("token", action.payload.token || "");
    },

    /* holds the server response obtained from the usePasswordVerificationMutation function in the authQuery  */
    setPasswordVerificationRes: (
      state,
      action: PayloadAction<Partial<TUserResData>>
    ) => {
      state.passwordVerificationRes = action.payload;
    },

    /* holds the server response obtained from the useContactVerificationMutation function in the authQuery  */
    setcontactVerificationRes: (
      state,
      action: PayloadAction<Partial<TUserResData> | null>
    ) => {
      state.contactVerificationRes = action.payload;
    },
    /* holds the new email address/contact number */
    setIdentifier: (state, action: PayloadAction<string>) => {
      state.identifier = action.payload;
    },

    /* holds the server response obtained from the useForgotPasswordMutation function in the authQuery  */
    setNewPasswordRes: (
      state,
      action: PayloadAction<Partial<TUserResData>>
    ) => {
      state.newPasswordRes = action.payload;
    },
    setDisplayedRegisterPage: (state, action: PayloadAction<string>) => {
      state.displayedRegisterPage = action.payload;
    },
    setDisplayedVerificationPage: (state, action: PayloadAction<string>) => {
      state.displayedVerificationPage = action.payload;
    },
    setRegistrationSuccessful: (state, action: PayloadAction<boolean>) => {
      state.registrationSuccessful = action.payload;
    },
  },
});

export const {
  login,
  setPasswordVerificationRes,
  setcontactVerificationRes,
  setIdentifier,
  setNewPasswordRes,
  setDisplayedRegisterPage,
  setDisplayedVerificationPage,
  setRegistrationSuccessful,
} = authSlice.actions;
export default authSlice.reducer;
