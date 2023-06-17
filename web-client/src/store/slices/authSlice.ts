import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  user: {
    for: string;
    id: string;
    status: string;
    userType: string;
  };
};

const initialState: AuthState = {
  token: null,
  user: {
    for: "",
    id: "",
    status: "",
    userType: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      localStorage.clear();
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
