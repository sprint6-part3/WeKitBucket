"use server";

import { cookies } from "next/headers";
import postRefreshToken from "@/apis/auth/postRefreshToken";
import createParams from "./createParams";

const baseUrl = process.env.BASE_URL;

const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const token = cookies().get("accessToken");
  if (token) {
    headers.Authorization = `Bearer ${token.value}`;
  }

  return headers;
};

const createQueryString = (url: string, params?: Record<string, string | number>): string =>
  params ? `${url}?${createParams(params)}` : url;

const fetchInstance = async <T>(
  url: string,
  options: RequestInit & { params?: Record<string, string | number> } = {},
): Promise<T> => {
  const defaultHeaders = getDefaultHeaders();

  const headers = new Headers({
    ...defaultHeaders,
    ...options.headers,
  });

  const queryString = createQueryString(url, options.params);

  try {
    const response = await fetch(`${baseUrl}${queryString}`, {
      ...options,
      headers,
    });
    // interceptor
    if (!response.ok) {
      if (response.status === 401) {
        // accessToken 재발급 시도
        const refreshTokenCookie = cookies().get("refreshToken");
        if (refreshTokenCookie) {
          try {
            await postRefreshToken(); // 새로운 accessToken을 받아옴
            const retryHeaders = getDefaultHeaders();
            const retryResponse = await fetch(`${baseUrl}${queryString}`, {
              ...options,
              headers: new Headers({
                ...retryHeaders,
                ...options.headers,
              }),
            });
            if (retryResponse.ok) {
              return retryResponse.json();
            }
          } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to refresh token");
          }
        }
        throw new Error("Unauthorized: No refresh token available");
      } else {
        const error = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(error.message || "Request failed");
      }
    }

    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Request failed");
  }
};

export default fetchInstance;
