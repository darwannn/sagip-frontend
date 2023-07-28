import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";

import type { TResponders, TTeam } from "../pages/TeamManagement/Types/Team";
import { User } from "../types/user";

export const teamQueryApi = createApi({
  reducerPath: "teamQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Teams", "Responders"],
  endpoints: (builder) => ({
    // Get all teams
    getTeams: builder.query<TTeam[], void>({
      query: () => "team",
      providesTags: (results) =>
        results
          ? results.map(({ _id }) => ({ type: "Teams", id: _id }))
          : ["Teams"],
    }),
    //Get a specific team
    getTeam: builder.query<TTeam, string>({
      query: (id) => ({
        url: `team/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (_result, _error, id) => [{ type: "Teams", id }],
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
    getUnassignedResponders: builder.query<User[], void>({
      query: () => ({
        url: "team/responder",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: TResponders) => {
        return response.unassignedResponders;
      },
      providesTags: ["Responders"],
    }),
    // Add a head to a team
    addTeamHead: builder.mutation<TTeam, { teamId: string; userId: string }>({
      query: ({ teamId, userId }) => ({
        url: `team/update/${teamId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { head: userId, members: [] },
      }),
      invalidatesTags: (_result, _error, { teamId }) => [
        { type: "Teams", id: teamId },
        "Responders",
      ],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useCreateTeamMutation,
  useLazyGetUnassignedRespondersQuery,
  useAddTeamHeadMutation,
} = teamQueryApi;
