import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { User } from "../../types/user";

export interface ManageUserState {
  users: User[] | null;
}

const initialState: ManageUserState = {
  users: null,
};

export const userManageSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
    setUsers: (state) => {
      state.users = [];
      console.log("setUsers");
    },
  },
});

export const { setUsers } = userManageSlice.actions;
export default userManageSlice.reducer;
