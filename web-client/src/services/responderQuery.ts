import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../api.config";
import { TResponders } from "../pages/TeamManagement/Types/Team";

export const responderQueryApi = createApi({
  reducerPath: "responderQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Responders"],
  endpoints: (builder) => ({
    // Get all responders
    getResponders: builder.query<TResponders, void>({
      query: () => ({
        url: "team/responder",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (results) =>
        results
          ? results.responders.map(({ _id }) => ({
              type: "Responders",
              id: _id,
            }))
          : ["Responders"],
    }),
  }),
});

export const { useLazyGetRespondersQuery } = responderQueryApi;
