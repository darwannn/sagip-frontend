import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserResData } from "../../types/user";

type TAccountState = {
  deleteAccountRes: Partial<TUserResData> | null;
};

const initialState: TAccountState = {
  deleteAccountRes: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setDeleteAccountRes: (
      state,
      action: PayloadAction<Partial<TUserResData>>
    ) => {
      state.deleteAccountRes = action.payload;
    },
  },
});

export const { setDeleteAccountRes } = accountSlice.actions;
export default accountSlice.reducer;
