import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAccountState = {
  deleteAccountRes: any;
};

const initialState: TAccountState = {
  deleteAccountRes: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setDeleteAccountRes: (state, action: PayloadAction<any>) => {
      state.deleteAccountRes = action.payload;
    },
  },
});

export const { setDeleteAccountRes } = accountSlice.actions;
export default accountSlice.reducer;
