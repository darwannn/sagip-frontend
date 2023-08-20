import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Types
import type { AuthType as AuthState } from "../../types/auth";

const initialState: AuthState = {
  token: null,

  passwordVerificationRes: null,
  contactVerificationRes: null,
  identifier: null,
  newPasswordRes: null,
  displayedRegisterPage: null,
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
    setPasswordVerificationRes: (state, action: PayloadAction<any>) => {
      state.passwordVerificationRes = action.payload;
    },

    /* holds the server response obtained from the useContactVerificationMutation function in the authQuery  */
    setcontactVerificationRes: (state, action: PayloadAction<any>) => {
      state.contactVerificationRes = action.payload;
    },
    /* holds the new email address/contact number */
    setIdentifier: (state, action: PayloadAction<any>) => {
      state.identifier = action.payload;
    },

    /* holds the server response obtained from the useForgotPasswordMutation function in the authQuery  */
    setNewPasswordRes: (state, action: PayloadAction<any>) => {
      state.newPasswordRes = action.payload;
    },
    setDisplayedRegisterPage: (state, action: PayloadAction<any>) => {
      state.displayedRegisterPage = action.payload;
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
} = authSlice.actions;
export default authSlice.reducer;
