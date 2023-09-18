import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { User } from "../../types/user";
import { RootState } from "../store";

export interface ManageUserState {
  isStaff: boolean;
  selectedVerificationRequest: User | null;
  userFilters: {
    isArchive: boolean;
    isBanned: boolean;
    gender: ["Male", "Female"];
  };
}

const initialState: ManageUserState = {
  isStaff: false,
  selectedVerificationRequest: null,
  userFilters: {
    isArchive: false,
    isBanned: false,
    gender: ["Male", "Female"],
  },
};

export const userManageSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
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
    setFilterArchive: (state, action: PayloadAction<boolean>) => {
      state.userFilters.isArchive = action.payload;
    },
    setFilterBanned: (state, action: PayloadAction<boolean>) => {
      state.userFilters.isBanned = action.payload;
    },
    setFilterGender: (state, action: PayloadAction<"Male" | "Female">) => {
      // Check if there is male in gender array
      if (state.userFilters.gender.includes(action.payload)) {
        const genderIndex = state.userFilters.gender.indexOf(action.payload);
        // Remove from the array
        state.userFilters.gender.splice(genderIndex, 1);
      } else if (!state.userFilters.gender.includes(action.payload)) {
        state.userFilters.gender.push(action.payload);
      } else {
        console.log("Something went wrong");
      }
    },
  },
});

export const {
  setTableContent,
  setSelectedVerificationRequest,
  unsetSelectedVerificationRequest,
  setFilterArchive,
  setFilterBanned,
  setFilterGender,
} = userManageSlice.actions;
export default userManageSlice.reducer;

// SELECTORS

export const selectionVerificationRequest = createSelector(
  (state: RootState) => state.userManage.selectedVerificationRequest,
  (selectedVerificationRequest: User | null) => selectedVerificationRequest
);

// Filters Selector
export const selectUserFilters = createSelector(
  (state: RootState) => state.userManage.userFilters,
  (userFilters: ManageUserState["userFilters"]) => userFilters
);
