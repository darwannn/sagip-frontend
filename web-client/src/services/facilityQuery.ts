import { TFacility } from "../types/emergencyFacility";
import { rootApi } from "./rootApi";

export const facilityQueryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all facilities
    getFacilities: builder.query<TFacility[], void>({
      query: () => "emergency-facility",
      providesTags: ["Facility", "OperationalFacility"],
    }),
    // Add facility
    addFacility: builder.mutation<void, { body: FormData }>({
      query: ({ body }) => ({
        url: "emergency-facility/add",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["Facility", "OperationalFacility"],
    }),
    // Update facility
    updateFacility: builder.mutation<
      void,
      { body: FormData; id: string | undefined }
    >({
      query: ({ body, id }) => ({
        url: `emergency-facility/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["Facility", "OperationalFacility"],
    }),
    // Delete facility
    deleteFacility: builder.mutation<void, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `emergency-facility/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Facility", "OperationalFacility"],
    }),

    getOperationalFacilities: builder.query<TFacility[], void>({
      query: () => "emergency-facility/operational",
      providesTags: ["OperationalFacility"],
    }),
  }),
});

export const {
  useGetFacilitiesQuery,
  useAddFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useGetOperationalFacilitiesQuery,
} = facilityQueryApi;
