import { configureStore } from "@reduxjs/toolkit";
// Slices
import authSlice from "./slices/authSlice";
import userManageSlice from "./slices/userManageSlice";
// API / Services / Queries
import { usersApi } from "../services/usersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    userManage: userManageSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
