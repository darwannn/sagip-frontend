import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { THazardReport } from "../../pages/HazardReports/types/hazardReport";

type THazardReportState = {
  selectedHazardReport: THazardReport | null;
};

const initialState: THazardReportState = {
  selectedHazardReport: null,
};

const hazardReportSlice = createSlice({
  name: "hazardReport",
  initialState,
  reducers: {
    setSelectedHazardReport: (state, action: PayloadAction<THazardReport>) => {
      state.selectedHazardReport = action.payload;
    },
  },
});

export const { setSelectedHazardReport } = hazardReportSlice.actions;

export default hazardReportSlice.reducer;

// Selectors
export const selectHazardReport = createSelector(
  (state: RootState) => state.hazardReports.selectedHazardReport,
  (selectedHazardReport) => selectedHazardReport
);
