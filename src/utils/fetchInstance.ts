"use server";

import { cookies } from "next/headers";
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

  const response = await fetch(`${baseUrl}${queryString}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

export default fetchInstance;
