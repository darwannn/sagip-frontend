import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

// Types
import type { TSurvey } from "../../pages/AlertsManagement/types/alert";
import { RootState } from "../store";

type TSurveyState = {
  alerts: TSurvey[] | null;
  activeAlert: TSurvey | null;
};

const initialState: TSurveyState = {
  alerts: [],
  activeAlert: null,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
  
    setActiveAlert: (state, action: PayloadAction<TSurvey>) => {
      state.activeAlert = action.payload;
    },
  },
});

export const { setActiveAlert } = alertSlice.actions;
export default alertSlice.reducer;

// Selectors

export const selectActiveAlert = createSelector(
  (state: RootState) => state.alerts.activeAlert, 
  (activeAlert) => activeAlert
);
