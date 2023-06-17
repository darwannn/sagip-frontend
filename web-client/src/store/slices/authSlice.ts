import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type AuthState = {
  token: null;
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
      // Store token and user in state / redux slice
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Store token in local storage
      localStorage.setItem("token", action.payload.token || "");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
