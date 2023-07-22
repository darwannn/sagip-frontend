import { configureStore } from "@reduxjs/toolkit";
// Slices
import authSlice from "./slices/authSlice";
import userManageSlice from "./slices/userManageSlice";
import articleSlice from "./slices/articleSlice";
import facilitySlice from "./slices/facilitySlice";
import hazardReportSlice from "./slices/hazardReportSlice";
// API / Services / Queries
import { usersApi } from "../services/usersApi";
import { articleQueryApi } from "../services/articleQuery";
import { facilityQueryApi } from "../services/facilityQuery";
import { hazardReportsQueryApi } from "../services/hazardReportsQuery";
import { teamQueryApi } from "../services/teamQuery";
import teamSlice from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [articleQueryApi.reducerPath]: articleQueryApi.reducer,
    [facilityQueryApi.reducerPath]: facilityQueryApi.reducer,
    [hazardReportsQueryApi.reducerPath]: hazardReportsQueryApi.reducer,
    [teamQueryApi.reducerPath]: teamQueryApi.reducer,
    facility: facilitySlice,
    userManage: userManageSlice,
    auth: authSlice,
    articles: articleSlice,
    hazardReports: hazardReportSlice,
    team: teamSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      articleQueryApi.middleware,
      facilityQueryApi.middleware,
      hazardReportsQueryApi.middleware,
      teamQueryApi.middleware,
    ]),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
