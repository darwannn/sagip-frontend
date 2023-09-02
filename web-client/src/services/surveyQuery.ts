import { TSurvey, TActiveSurvey, TSurveyResData } from "../types/survey";
import { rootApi } from "./rootApi";

export const surveyQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getSurvey: builder.query<TSurvey[], void>({
      query: () => "wellness-survey",
      providesTags: ["WellnessSurvey"],
    }),
    // Get specific article with id
    getSurveyById: builder.query<TSurvey, string | undefined>({
      query: (id) => `wellness-survey/${id}`,
      providesTags: ["SelectedSurvey"],
    }),
    getActiveSurvey: builder.query<TActiveSurvey, void>({
      query: () => `wellness-survey/active`,
      providesTags: ["ActiveSurvey"],
    }),
    getSurveyReportById: builder.query<TSurvey, string | undefined>({
      query: (id) => `wellness-survey/report/${id}`,
      providesTags: ["SurveyReport"],
    }),
    addSurvey: builder.mutation<TSurveyResData, Partial<TSurvey>>({
      query: (body) => ({
        url: "wellness-survey/add",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["WellnessSurvey", "ActiveSurvey"],
    }),
    // Update article
    updateSurvey: builder.mutation<
      TSurveyResData,
      { body: Partial<TSurvey>; id: string }
    >({
      query: ({ body, id }) => ({
        url: `wellness-survey/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["WellnessSurvey", "SelectedSurvey", "ActiveSurvey"],
    }),

    deleteSurvey: builder.mutation<void, { token: string | null; id: string }>({
      query: ({ token, id }) => ({
        url: `wellness-survey/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["WellnessSurvey", "ActiveSurvey"],
    }),
  }),
});

export const {
  useGetSurveyQuery,
  useGetSurveyByIdQuery,
  useGetActiveSurveyQuery,
  useDeleteSurveyMutation,
  useAddSurveyMutation,
  useUpdateSurveyMutation,
  useGetSurveyReportByIdQuery,
} = surveyQueryApi;
