import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { User } from "../../types/user";
import { RootState } from "../store";

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

// Selectors
// -- Select all staff users
export const selectStaffUsers = createSelector(
  (state: RootState) => state.userManage.users,
  (users: User[]) => users.filter((user: User) => user.userType != "resident")
);
