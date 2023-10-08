import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  TAssistanceRequest,
  TAssistanceRequestState,
} from "../../types/assistanceRequest";
import { RootState } from "../store";

const initialState: TAssistanceRequestState = {
  selectedAssistanceRequest: null,
  assistanceCategory: null,

  displayedAssistancePage: null,
};

export const assistanceReqSlice = createSlice({
  name: "assistanceReq",
  initialState,
  reducers: {
    setSelectedAssistanceRequest: (
      state,
      action: PayloadAction<TAssistanceRequest | null>
    ) => {
      state.selectedAssistanceRequest = action.payload;
    },

    setDisplayedAssistancePage: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.displayedAssistancePage = action.payload;
    },
    setAssistanceCategory: (state, action: PayloadAction<string | null>) => {
      state.assistanceCategory = action.payload;
    },
   
  },
});

export const {
  setSelectedAssistanceRequest,
  setDisplayedAssistancePage,
  setAssistanceCategory,

} = assistanceReqSlice.actions;
export default assistanceReqSlice.reducer;

// Selectors
export const selectAssistanceReq = createSelector(
  (state: RootState) => state.assistanceReq.selectedAssistanceRequest,
  (selectedAssistanceRequest) => selectedAssistanceRequest
);
