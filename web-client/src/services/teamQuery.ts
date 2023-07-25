import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";

import type {
  TResponder,
  TResponders,
  TTeam,
} from "../pages/TeamManagement/Types/Team";

export const teamQueryApi = createApi({
  reducerPath: "teamQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Teams"],
  endpoints: (builder) => ({
    // Get all teams
    getTeams: builder.query<TTeam[], void>({
      query: () => "team",
      providesTags: (results) =>
        results
          ? results.map(({ _id }) => ({ type: "Teams", id: _id }))
          : ["Teams"],
    }),
    // Add a team
    createTeam: builder.mutation<TTeam, Partial<TTeam>>({
      query: (body) => ({
        url: "team/add",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Teams"],
    }),
    //Get Unassigned Responders
    getUnassignedResponders: builder.query<TResponder[], string>({
      query: () => ({
        url: "team/responder",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: TResponders) => {
        return response.unassignedResponders;
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useLazyGetUnassignedRespondersQuery,
} = teamQueryApi;
