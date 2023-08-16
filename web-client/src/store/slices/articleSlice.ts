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

// -- Count number of articles
export const selectNumberOfArticles = createSelector(
  (state: RootState) => state.articles.articles,
  (articles: Article[]) => articles.length
);

// -- Count number of published articles
export const selectNumberOfPublishedArticles = createSelector(
  (state: RootState) => state.articles.articles,
  (articles: Article[]) => {
    const publishedArticle = articles.filter(
      (article: Article) => article.status === "published"
    );
    return publishedArticle.length;
  }
);

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;

// Selectors
export const selectArticles = createSelector(
  (state: RootState) => state.articles.articles,
  (articles: Article[]) => articles
);
