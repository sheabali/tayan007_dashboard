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
  }),
});

export const { useGetDashboardDataQuery, useGetUserManagementDataQuery, useGetUserDetailsQuery } = dashboardApi;
