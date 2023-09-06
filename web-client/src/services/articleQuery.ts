import { Article, TArticleResData } from "../types/article";
import { rootApi } from "./rootApi";

export const articleQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all articles
    getArticles: builder.query<Article[], void>({
      query: () => "safety-tips",
      providesTags: ["Article"],
    }),
    // Get specific article with id
    getArticleById: builder.query<Article, string | undefined>({
      query: (id) => `safety-tips/${id}`,
      providesTags: ["SelectedArticle"],
    }),
    addArticle: builder.mutation<
      TArticleResData,
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
      invalidatesTags: ["Article"],
    }),
    // Update article
    updateArticle: builder.mutation<
      TArticleResData,
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
      invalidatesTags: ["SelectedArticle"],
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
        invalidatesTags: ["Article"],
      }
    ),

    /* Get published articles */
    getPublishedArticles: builder.query<Article[], void>({
      query: () => "safety-tips/published",
      providesTags: ["SavedArticle"],
    }),
    /* Get saved article of specific user*/
    getSavedArticles: builder.query<Article[], void>({
      query: () => ({
        url: "safety-tips/saved",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["SavedArticle"],
    }),
    saveArticle: builder.mutation<TArticleResData, string>({
      query: (id) => ({
        url: `safety-tips/saves/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [
        "Article",
        "SelectedArticle",
        "PublishedArticle",
        "SavedArticle",
      ],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,

  useGetPublishedArticlesQuery,
  useGetSavedArticlesQuery,
  useSaveArticleMutation,
} = articleQueryApi;
