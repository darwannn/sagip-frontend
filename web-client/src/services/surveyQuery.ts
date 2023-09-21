import { TSurvey, TActiveSurvey, TSurveyResData } from "../types/survey";
import { rootApi } from "./rootApi";

export const surveyQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getSurvey: builder.query<TSurvey[], void>({
      query: () => "wellness-survey",
      providesTags: ["WellnessSurvey"],
      transformResponse: (res: TSurvey[]) => {
        // Sort by endDate
        return res.sort((a, b) => {
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        });
      },
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

    /* Checks if user already answered the survey */
    getCheckActiveSurvey: builder.query<TActiveSurvey, void>({
      query: () => ({
        url: `wellness-survey/myresponse`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["CheckActiveSurvey"],
    }),

    answerSurvey: builder.mutation<TSurveyResData, string>({
      query: (answer) => ({
        url: `wellness-survey/answer/`,
        method: "PUT",
        body: { answer },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["CheckActiveSurvey"],
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

  useGetCheckActiveSurveyQuery,
  useAnswerSurveyMutation,
} = surveyQueryApi;
