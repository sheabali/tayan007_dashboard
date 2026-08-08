import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getUserManagementData: builder.query({
      query: (params) => ({
        url: "/admin/user-management",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id: string) => ({
        url: `/admin/user-management/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getJobsData: builder.query({
      query: (params) => ({
        url: "/admin/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getJobDetails: builder.query({
      query: (id: string) => ({
        url: `/admin/jobs/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    suspendJob: builder.mutation({
      query: (id: string) => ({
        url: `/admin/jobs/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Jobs", id }, "Jobs"],
    }),
    deleteJob: builder.mutation({
      query: (id: string) => ({
        url: `/admin/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    getPaymentStats: builder.query({
      query: () => ({
        url: "/admin/dashboard/payment-stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getPayouts: builder.query({
      query: () => ({
        url: "/payments/payouts",
        method: "GET",
      }),
      providesTags: ["Payouts"],
    }),
    processPayout: builder.mutation({
      query: (id: string | number) => ({
        url: `/payments/payouts/${id}/process`,
        method: "PATCH",
      }),
      invalidatesTags: ["Payouts"],
    }),
    getRefunds: builder.query({
      query: (params) => ({
        url: "/payments/refunds",
        method: "GET",
        params,
      }),
      providesTags: ["Refunds"],
    }),
    suspendUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/user-management/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }, "User"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/user-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getCategoryStats: builder.query({
      query: (params) => ({
        url: "/admin/category/stats",
        method: "GET",
        params,
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/admin/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/admin/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/admin/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getLocations: builder.query({
      query: (params) => ({
        url: "/admin/location",
        method: "GET",
        params,
      }),
      providesTags: ["Location"],
    }),
    createLocation: builder.mutation({
      query: (body: {
        country: string;
        currency: string;
        stateCount: number;
        cityCount: number;
        serviceAreaCount: number;
        status: string;
      }) => ({
        url: "/admin/location",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: builder.mutation({
      query: ({ id, ...body }: {
        id: string;
        country: string;
        currency: string;
        stateCount: number;
        cityCount: number;
        serviceAreaCount: number;
        status: string;
      }) => ({
        url: `/admin/location/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    deleteLocation: builder.mutation({
      query: (id: string) => ({
        url: `/admin/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetUserManagementDataQuery,
  useGetUserDetailsQuery,
  useGetJobsDataQuery,
  useGetJobDetailsQuery,
  useSuspendJobMutation,
  useDeleteJobMutation,
  useGetPaymentStatsQuery,
  useGetPayoutsQuery,
  useProcessPayoutMutation,
  useGetRefundsQuery,
  useSuspendUserMutation,
  useDeleteUserMutation,
  useGetCategoryStatsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetLocationsQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = dashboardApi;
