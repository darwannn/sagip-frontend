import { configureStore } from "@reduxjs/toolkit";
// Slices
import authSlice from "./slices/authSlice";
import userManageSlice from "./slices/userManageSlice";
import articleSlice from "./slices/articleSlice";
import facilitySlice from "./slices/facilitySlice";
import hazardReportSlice from "./slices/hazardReportSlice";
import accountSlice from "./slices/accountSlice";
import alertSlice from "./slices/alertSlice";
import assistanceReqSlice from "./slices/assistanceReqSlice";
// API / Services / Queries
import teamSlice from "./slices/teamSlice";
import { rootApi } from "../services/rootApi";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    facility: facilitySlice,
    userManage: userManageSlice,
    auth: authSlice,
    articles: articleSlice,
    hazardReports: hazardReportSlice,
    team: teamSlice,
    account: accountSlice,
    alerts: alertSlice,
    assistanceReq: assistanceReqSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([rootApi.middleware]),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
