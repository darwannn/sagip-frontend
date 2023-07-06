import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TFacility } from "../../pages/MapManagement/types/emergencyFacility";
import { RootState } from "../store";

type TFacilityState = {
  selectedFacility: TFacility | null;
};

const initialState: TFacilityState = {
  selectedFacility: null,
};

export const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setSelectedFacility: (state, action: PayloadAction<TFacility>) => {
      state.selectedFacility = action.payload;
    },
    unsetSelectedFacility: (state) => {
      state.selectedFacility = null;
    },
  },
});

export const { setSelectedFacility, unsetSelectedFacility } =
  facilitySlice.actions;
export default facilitySlice.reducer;

// Selectors
export const selectionFacility = createSelector(
  (state: RootState) => state.facility.selectedFacility,
  (selectedFacility: TFacility | null) => selectedFacility
);
