import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  TAssistanceRequest,
  TAssistanceRequestState,
} from "../../types/assistanceRequest";
import { RootState } from "../store";

const initialState: TAssistanceRequestState = {
  selectedAssistanceRequest: null,
  assistanceCategory: null,
  assistanceQuestionOne: null,
  assistanceQuestionTwo: null,
  assistanceQuestionThree: null,
  assistanceButtonClicked: false,
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
    setAssistanceQuestionOne: (state, action: PayloadAction<string | null>) => {
      state.assistanceQuestionOne = action.payload;
    },
    setAssistanceQuestionTwo: (state, action: PayloadAction<string | null>) => {
      state.assistanceQuestionTwo = action.payload;
    },
    setAssistanceQuestionThree: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.assistanceQuestionThree = action.payload;
    },
    setAssistanceButtonClicked: (state, action: PayloadAction<boolean>) => {
      state.assistanceButtonClicked = action.payload;
    },
  },
});

export const {
  setSelectedAssistanceRequest,
  setDisplayedAssistancePage,
  setAssistanceCategory,
  setAssistanceQuestionOne,
  setAssistanceQuestionTwo,
  setAssistanceQuestionThree,
  setAssistanceButtonClicked,
} = assistanceReqSlice.actions;
export default assistanceReqSlice.reducer;

// Selectors
export const selectAssistanceReq = createSelector(
  (state: RootState) => state.assistanceReq.selectedAssistanceRequest,
  (selectedAssistanceRequest) => selectedAssistanceRequest
);
