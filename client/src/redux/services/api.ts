// src/redux/services/api.ts
import baseUrl from "@/config/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl || "https://studio-booking-api.onrender.com/api",
  prepareHeaders: async headers => {
    const session = await getSession();
    const token = session?.user?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("🔄 Access token expired, refreshing...");

    // Get session again
    const session = await getSession();
    const refreshToken = session?.user?.refreshToken;

    if (!refreshToken) {
      console.log("No refresh token found — signing out");
      signOut({ callbackUrl: "/auth" });
      return result;
    }

    // Try refreshing token via your backend
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;
      const newRefreshToken =
        (refreshResult.data as any).refreshToken ?? refreshToken;

      // ✅ Update session manually (NextAuth doesn’t auto-refresh client-side)
      const res = await fetch("/api/auth/session?update=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }),
      });

      if (res.ok) {
        console.log("✅ Token refreshed, retrying original request");
        // Retry original request with new access token
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        console.log("❌ Failed to update session");
        signOut({ callbackUrl: "/auth" });
      }
    } else {
      console.log("❌ Refresh token invalid — signing out");
      signOut({ callbackUrl: "/auth" });
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Bookings",
    "User",
    "Auth",
    "Payments",
    "AdminStats",
    "Profile",
    "Sessions",
    "Packages",
  ],
  endpoints: () => ({}),
  refetchOnReconnect: true,
  refetchOnFocus: true,
  keepUnusedDataFor: 300,
});
