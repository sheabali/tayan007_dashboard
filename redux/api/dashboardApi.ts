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
    getCategoryStats: builder.query({
      query: () => ({
        url: "/admin/category/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard", "Jobs"], // Since it counts jobs, maybe useful, or maybe "Category" if we add it
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
  useGetCategoryStatsQuery,
  useGetPaymentStatsQuery,
  useGetPayoutsQuery,
  useProcessPayoutMutation,
  useGetRefundsQuery,
} = dashboardApi;
