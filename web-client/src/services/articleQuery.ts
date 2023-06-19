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
  }),
});

export const { useGetArticlesQuery } = articleQueryApi;
