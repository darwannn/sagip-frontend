import { TResponders } from "../types/team";
import { rootApi } from "./rootApi";

export const responderQueryApi = rootApi.injectEndpoints({
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
