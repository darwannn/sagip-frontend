import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  TAssistanceRequest,
  TAssistanceRequestState,
} from "../../pages/EmergencyReports/types/assistanceRequest";
import { RootState } from "../store";

const initialState: TAssistanceRequestState = {
  selectedAssistanceRequest: null,
};

export const assistanceReqSlice = createSlice({
  name: "assistanceReq",
  initialState,
  reducers: {
    setSelectedAssistanceRequest: (
      state,
      action: PayloadAction<TAssistanceRequest>
    ) => {
      state.selectedAssistanceRequest = action.payload;
    },
  },
});

export const { setSelectedAssistanceRequest } = assistanceReqSlice.actions;
export default assistanceReqSlice.reducer;

// Selectors
export const selectAssistanceReq = createSelector(
  (state: RootState) => state.assistanceReq.selectedAssistanceRequest,
  (selectedAssistanceRequest) => selectedAssistanceRequest
);
