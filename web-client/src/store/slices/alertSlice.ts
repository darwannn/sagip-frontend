import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import { SMSAlertTemplate } from "../../types/alert";
import { RootState } from "../store";

type TAlertState = {
  selectedTemplate: SMSAlertTemplate | null;
};

const initialState: TAlertState = {
  selectedTemplate: null,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setSelectedTemplate: (
      state,
      action: PayloadAction<SMSAlertTemplate | null>
    ) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { setSelectedTemplate } = alertSlice.actions;
export default alertSlice.reducer;

// Create selectors to select the selected template
export const selectedTemplate = createSelector(
  (state: RootState) => state.alert.selectedTemplate,
  (selectedTemplate: SMSAlertTemplate | null) => selectedTemplate
);
