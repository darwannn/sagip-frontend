import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";
import { Article } from "../types/article";

export const articleQueryApi = createApi({
  reducerPath: "articleQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], void>({
      query: () => "safety-tips",
    }),
    getArticleById: builder.query<Article, string | undefined>({
      query: (id) => `safety-tips/${id}`,
    }),
    addArticle: builder.mutation<
      void,
      { body: FormData; token: string | null }
    >({
      query: ({ body, token }) => ({
        url: "safety-tips/add",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useGetArticleByIdQuery,
} = articleQueryApi;
