import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TFacility } from "../../pages/MapManagement/types/emergencyFacility";

import { RootState } from "../store";

type TFacilityState = {
  selectedFacility: TFacility | null;
  isAddMode: boolean;
  tempMarkerPos: {
    lat: number | undefined;
    lng: number | undefined;
  } | null;
};

const initialState: TFacilityState = {
  selectedFacility: null,
  isAddMode: false,
  tempMarkerPos: null,
};

export const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setSelectedFacility: (state, action: PayloadAction<TFacility>) => {
      state.selectedFacility = action.payload;
      if (state.isAddMode) state.isAddMode = false;
      if (state.tempMarkerPos) state.tempMarkerPos = null;
    },
    unsetSelectedFacility: (state) => {
      state.selectedFacility = null;
    },
    setAddMode: (state, action: PayloadAction<boolean>) => {
      state.isAddMode = action.payload;
      if (state.tempMarkerPos) state.tempMarkerPos = null;
    },
    setTempMarkerPos: (
      state,
      action: PayloadAction<{
        lat: number | undefined;
        lng: number | undefined;
      } | null>
    ) => {
      console.log("new temp marker pos");
      state.tempMarkerPos = action.payload;
    },
  },
});

export const {
  setSelectedFacility,
  unsetSelectedFacility,
  setAddMode,
  setTempMarkerPos,
} = facilitySlice.actions;
export default facilitySlice.reducer;

// Selectors
export const selectionFacility = createSelector(
  (state: RootState) => state.facility.selectedFacility,
  (selectedFacility: TFacility | null) => selectedFacility
);

export const selectAddMode = createSelector(
  (state: RootState) => state.facility.isAddMode,
  (isAddMode: boolean) => isAddMode
);

export const selectTempMarkerPos = createSelector(
  (state: RootState) => state.facility.tempMarkerPos,
  (
    tempMarkerPos: {
      lat: number | undefined;
      lng: number | undefined;
    } | null
  ) => tempMarkerPos
);
