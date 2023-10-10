import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { RootState } from "../store";
import { Roles } from "../../types/user";
import { TUserNotification } from "../../types/notification";
export interface ManageUserState {
  isStaff: boolean;
  userFilters: {
    isArchive: boolean;
    isBanned: boolean;
    // gender: ["Male", "Female"];
    roles: Roles[];
    // status: ["verified", "unverified", "semi-verified"];
    status: string[];
  };
  selectedNotification: TUserNotification | null;
}

const initialState: ManageUserState = {
  isStaff: false,
  userFilters: {
    isArchive: false,
    isBanned: false,
    // gender: ["Male", "Female"],
    roles: [],
    status: [],
  },
  selectedNotification: null,
};

export const userManageSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
    setTableContent: (state, action: PayloadAction<boolean>) => {
      state.isStaff = action.payload;
    },
    setFilterArchive: (state, action: PayloadAction<boolean>) => {
      state.userFilters.isArchive = action.payload;
    },
    setFilterBanned: (state, action: PayloadAction<boolean>) => {
      state.userFilters.isBanned = action.payload;
    },
    // setFilterGender: (state, action: PayloadAction<"Male" | "Female">) => {
    //   // Check if there is male in gender array
    //   if (state.userFilters.gender.includes(action.payload)) {
    //     const genderIndex = state.userFilters.gender.indexOf(action.payload);
    //     // Remove from the array
    //     state.userFilters.gender.splice(genderIndex, 1);
    //   } else if (!state.userFilters.gender.includes(action.payload)) {
    //     state.userFilters.gender.push(action.payload);
    //   } else {
    //     console.log("Something went wrong");
    //   }
    // },
    setFilterRoles: (state, action: PayloadAction<Roles>) => {
      if (state.userFilters.roles.includes(action.payload)) {
        const roleIndex = state.userFilters.roles.indexOf(action.payload);
        state.userFilters.roles.splice(roleIndex, 1);
      } else if (!state.userFilters.roles.includes(action.payload)) {
        state.userFilters.roles.push(action.payload);
      } else {
        console.log("Something went wrong");
      }
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      if (state.userFilters.status.includes(action.payload)) {
        const statusIndex = state.userFilters.status.indexOf(action.payload);
        state.userFilters.status.splice(statusIndex, 1);
      } else if (!state.userFilters.status.includes(action.payload)) {
        state.userFilters.status.push(action.payload);
      } else {
        console.log("Something went wrong");
      }
    },

    /* used in mobile notification item */
    setSelectedNotification: (
      state,
      action: PayloadAction<TUserNotification | null>
    ) => {
      state.selectedNotification = action.payload;
    },
  },
});

export const {
  setTableContent,
  setFilterArchive,
  setFilterBanned,
  // setFilterGender,
  setFilterRoles,
  setFilterStatus,
  setSelectedNotification,
} = userManageSlice.actions;
export default userManageSlice.reducer;

// Filters Selector
export const selectUserFilters = createSelector(
  (state: RootState) => state.userManage.userFilters,
  (userFilters: ManageUserState["userFilters"]) => userFilters
);
