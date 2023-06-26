import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";
import { Article } from "../types/article";

export const articleQueryApi = createApi({
  reducerPath: "articleQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    // Get all articles
    getArticles: builder.query<Article[], void>({
      query: () => "safety-tips",
    }),
    // Get specific article with id
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
    // Update article
    updateArticle: builder.mutation<
      void,
      { body: FormData; token: string | null; id: string }
    >({
      query: ({ body, token, id }) => ({
        url: `safety-tips/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // Delete article
    deleteArticle: builder.mutation<void, { token: string | null; id: string }>(
      {
        query: ({ token, id }) => ({
          url: `safety-tips/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }
    ),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleQueryApi;
