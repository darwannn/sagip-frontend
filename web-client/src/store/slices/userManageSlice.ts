import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { User } from "../../types/user";
import { RootState } from "../store";

export interface ManageUserState {
  isStaff: boolean;
  users: User[];
  selectedVerificationRequest: User | null;
  // isVerifyMode: boolean;
}

const initialState: ManageUserState = {
  isStaff: false,
  users: [],
  selectedVerificationRequest: null,
  // isVerifyMode: false,
};

export const userManageSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setTableContent: (state, action: PayloadAction<boolean>) => {
      state.isStaff = action.payload;
    },
    setSelectedVerificationRequest: (state, action: PayloadAction<User>) => {
      state.selectedVerificationRequest = action.payload;
      //  if (state.isVerifyMode) state.isVerifyMode = false;
    },
    unsetSelectedVerificationRequest: (state) => {
      state.selectedVerificationRequest = null;
    },
  },
});

export const {
  setUsers,
  setTableContent,
  setSelectedVerificationRequest,
  unsetSelectedVerificationRequest,
} = userManageSlice.actions;
export default userManageSlice.reducer;

// SELECTORS
// -- Select all staff users
export const selectStaffUsers = createSelector(
  (state: RootState) => state.userManage.users,
  (users: User[]) => users.filter((user: User) => user.userType != "resident")
);

// -- Select users data for table depending on isStaff
export const selectUserTableData = createSelector(
  (state: RootState) => state.userManage.isStaff,
  (state: RootState) => state.userManage.users,
  (isStaff: boolean, users: User[]) => {
    if (isStaff) {
      return users.filter((user: User) => user.userType != "resident");
    } else {
      /* return users; */
      return users.filter((user: User) => user.userType === "resident");
    }
  }
);

export const selectionVerificationRequest = createSelector(
  (state: RootState) => state.userManage.selectedVerificationRequest,
  (selectedVerificationRequest: User | null) => selectedVerificationRequest
);
