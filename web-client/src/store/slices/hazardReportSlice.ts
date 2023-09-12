import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { THazardReport } from "../../types/hazardReport";

type THazardReportState = {
  selectedHazardReport: THazardReport | null;
  selectedHazard: string | null;
};

const initialState: THazardReportState = {
  selectedHazardReport: null,
  selectedHazard: null,
};

const hazardReportSlice = createSlice({
  name: "hazardReport",
  initialState,
  reducers: {
    setSelectedHazardReport: (
      state,
      action: PayloadAction<THazardReport | null>
    ) => {
      state.selectedHazardReport = action.payload;
    },
    /* 
    used on mobile,
    determines which marker the user selected
    */
    setSelectedHazard: (state, action: PayloadAction<string | null>) => {
      state.selectedHazard = action.payload;
    },
  },
});

export const { setSelectedHazardReport, setSelectedHazard } =
  hazardReportSlice.actions;

export default hazardReportSlice.reducer;

// Selectors
export const selectHazardReport = createSelector(
  (state: RootState) => state.hazardReports.selectedHazardReport,
  (selectedHazardReport) => selectedHazardReport
);
