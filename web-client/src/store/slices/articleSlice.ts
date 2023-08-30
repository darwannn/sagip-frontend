import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
// Types
import type { Article, ArticleState } from "../../pages/Articles/types/article";
import { RootState } from "../store";

const initialState: ArticleState = {
  articles: [],
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;

// Selectors
export const selectArticles = createSelector(
  (state: RootState) => state.articles.articles,
  (articles: Article[]) => articles
);
