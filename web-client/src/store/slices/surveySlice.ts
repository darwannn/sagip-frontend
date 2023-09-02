import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

// Types
import type { TSurvey } from "../../types/alert";
import { RootState } from "../store";

type TSurveyState = {
  survey: TSurvey[] | null;
  activeSurvey: TSurvey | null;
};

const initialState: TSurveyState = {
  survey: [],
  activeSurvey: null,
};

export const surveySlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setActiveAlert: (state, action: PayloadAction<TSurvey>) => {
      state.activeSurvey = action.payload;
    },
  },
});

export const { setActiveAlert } = surveySlice.actions;
export default surveySlice.reducer;

// Selectors

export const selectActiveAlert = createSelector(
  (state: RootState) => state.survey.activeSurvey,
  (activeAlert) => activeAlert
);
