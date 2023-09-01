import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TTeam } from "../../types/team";

type teamState = {
  selectedTeam: TTeam | null;
};

const initialState: teamState = {
  selectedTeam: null,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setSelectedTeam: (state, action: PayloadAction<TTeam | null>) => {
      state.selectedTeam = action.payload;
    },
  },
});
export const { setSelectedTeam } = teamSlice.actions;
export default teamSlice.reducer;

// Selectors
export const selectSelectedTeam = createSelector(
  (state: RootState) => state.team.selectedTeam,
  (selectedTeam: TTeam | null) => selectedTeam
);
