import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { User } from "../../types/user";

export interface ManageUserState {
  users: User[];
}

const initialState: ManageUserState = {
  users: [],
};

export const userManageSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      console.log("setUsers", state.users);
    },
  },
});

export const { setUsers } = userManageSlice.actions;
export default userManageSlice.reducer;
