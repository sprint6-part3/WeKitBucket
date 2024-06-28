"use server";

import { cookies } from "next/headers";
import createParams from "./createParams";

const baseUrl = process.env.BASE_URL;

const getDefaultHeaders = (requiresAuth: boolean): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    headers.Authorization = `Bearer ${cookies().get("accessToken")}`;
  }

  return headers;
};

const createQueryString = (url: string, params?: Record<string, string | number>): string =>
  url.includes("?") ? url : `${url}?${createParams(params || {})}`;

const fetchInstance = async (
  url: string,
  options: RequestInit & { params?: Record<string, string | number> } = {},
  requiresAuth = false,
) => {
  const headers = getDefaultHeaders(requiresAuth);
  const queryString = createQueryString(url, options.params);

  const response = await fetch(`${baseUrl}${queryString}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

export default fetchInstance;
