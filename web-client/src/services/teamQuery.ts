import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../api.config";

import type { TTeam } from "../pages/TeamManagement/Types/Team";

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
  }),
});

export const { useGetTeamsQuery } = teamQueryApi;
