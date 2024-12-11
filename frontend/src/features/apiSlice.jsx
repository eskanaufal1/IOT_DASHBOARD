import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deviceDataApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AXIOS_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRealtimeDataApi: builder.query({
      query: (user) => ({
        url: "/getlatestdata",
        method: "POST",
        body: { created_by: user.email },
      }),
    }),
    getDevicesApi: builder.query({
      query: (user) => ({
        url: "/getdevices",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useGetRealtimeDataApiQuery, useGetDevicesApiQuery } =
  deviceDataApi;
