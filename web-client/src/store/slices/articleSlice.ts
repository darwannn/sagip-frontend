import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Types
import type { Article, ArticleState } from "../../types/article";

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
