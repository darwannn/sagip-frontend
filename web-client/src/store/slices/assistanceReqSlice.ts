import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TAssistanceRequest,
  TAssistanceRequestState,
} from "../../pages/EmergencyReports/types/assistanceRequest";

const initialState: TAssistanceRequestState = {
  selectedAssistanceRequest: null,
};

export const assistanceReqSlice = createSlice({
  name: "assistanceReq",
  initialState,
  reducers: {
    setSelectetAssistanceRequest: (
      state,
      action: PayloadAction<TAssistanceRequest>
    ) => {
      state.selectedAssistanceRequest = action.payload;
    },
  },
});

export default assistanceReqSlice.reducer;
