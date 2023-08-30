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
import { articleQueryApi } from "../services/articleQuery";
import { facilityQueryApi } from "../services/facilityQuery";
import { hazardReportsQueryApi } from "../services/hazardReportsQuery";
import teamSlice from "./slices/teamSlice";
import { responderQueryApi } from "../services/responderQuery";
import { alertQueryApi } from "../services/alertQuery";
import { accountQueryApi } from "../services/accountQuery";
import { authQueryApi } from "../services/authQuery";
import { assistanceRequestQueryApi } from "../services/assistanceRequestQuery";
import { rootApi } from "../services/rootApi";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [articleQueryApi.reducerPath]: articleQueryApi.reducer,
    [facilityQueryApi.reducerPath]: facilityQueryApi.reducer,
    [hazardReportsQueryApi.reducerPath]: hazardReportsQueryApi.reducer,
    [responderQueryApi.reducerPath]: responderQueryApi.reducer,
    [alertQueryApi.reducerPath]: alertQueryApi.reducer,
    [accountQueryApi.reducerPath]: accountQueryApi.reducer,
    [authQueryApi.reducerPath]: authQueryApi.reducer,
    [assistanceRequestQueryApi.reducerPath]: assistanceRequestQueryApi.reducer,
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
    getDefaultMiddleware().concat([
      rootApi.middleware,
      articleQueryApi.middleware,
      facilityQueryApi.middleware,
      hazardReportsQueryApi.middleware,
      responderQueryApi.middleware,
      alertQueryApi.middleware,
      accountQueryApi.middleware,
      authQueryApi.middleware,
      assistanceRequestQueryApi.middleware,
    ]),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
