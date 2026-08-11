import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AUTH_STORAGE_KEY = "auth";

const authBaseQuery = fetchBaseQuery({
  baseUrl: "https://api.v2.react-learning.ru",
  prepareHeaders: (headers) => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const { accessToken } = JSON.parse(raw) as { accessToken: string };
        if (accessToken) {
          headers.set("Authorization", accessToken);
        }
      }
    } catch {
      // ex
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserMe: builder.query<IUser, void>({
      query: () => "/users/me",
    }),
  }),
});

export const { useGetUserMeQuery } = userApi;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Tasks"],
  endpoints: () => ({}),
});

export interface IUser {
  id: string;
  email: string;
  name: string;
  avatarPath: string;
  about: string;
  phone: string;
  roles: string[];
  likes: string[];
  favoritesPost: string[];
}
