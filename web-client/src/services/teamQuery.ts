import type { TResponders, TTeam, TTeamResponse } from "../types/team";
import { User } from "../types/user";
import { rootApi } from "./rootApi";

export const teamQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all teams
    getTeams: builder.query<TTeam[], void>({
      query: () => "team",
      providesTags: (results) =>
        results
          ? results.map(({ _id }) => ({ type: "Teams", id: _id }))
          : ["Teams"],
    }),
    getActiveTeams: builder.query<TTeam[], void>({
      query: () => "team/active",
      providesTags: (results) =>
        results
          ? results.map(({ _id }) => ({ type: "ActiveTeams", id: _id }))
          : ["ActiveTeams"],
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
    createTeam: builder.mutation<TTeamResponse, Partial<TTeam>>({
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
    deleteTeam: builder.mutation<TTeam, string>({
      query: (id) => ({
        url: `team/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Teams", id },
        "Responders",
      ],
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
        body: { head: userId },
      }),
      invalidatesTags: (_result, _error, { teamId }) => [
        { type: "Teams", id: teamId },
        "Responders",
      ],
    }),
    // Add a member to a team
    addTeamMember: builder.mutation<TTeam, { teamId: string; userId: string }>({
      query: ({ teamId, userId }) => ({
        url: `team/update/${teamId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { members: [userId] },
      }),
      invalidatesTags: (_result, _error, { teamId }) => [
        { type: "Teams", id: teamId },
        "Responders",
      ],
    }),
    // Unassign member to a team
    unassignMember: builder.mutation<
      TTeam,
      { userId: string; prevTeamId: string }
    >({
      query: ({ userId, prevTeamId }) => ({
        url: `team/update/assignment/member`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { newTeamId: "unassigned", userId, prevTeamId },
      }),
      invalidatesTags: (_result, _error, { prevTeamId }) => [
        { type: "Teams", id: prevTeamId },
        "Responders",
      ],
    }),
    unassignHead: builder.mutation<
      TTeam,
      { userId: string; prevTeamId: string }
    >({
      query: ({ userId, prevTeamId }) => ({
        url: `team/update/assignment/head`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { newTeamId: "unassigned", userId, prevTeamId },
      }),
      invalidatesTags: (_result, _error, { prevTeamId }) => [
        { type: "Teams", id: prevTeamId },
        "Responders",
      ],
    }),

    getMyTeam: builder.query<TTeam, void>({
      query: () => ({
        url: `team/myteam`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useGetActiveTeamsQuery,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useLazyGetUnassignedRespondersQuery,
  useAddTeamHeadMutation,
  useAddTeamMemberMutation,
  useUnassignMemberMutation,
  useUnassignHeadMutation,

  useGetMyTeamQuery,
} = teamQueryApi;
