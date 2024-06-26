import { cookies } from "next/headers";
import createParams from "./createParams";

const baseUrl = process.env.BASE_URL;

const fetchInstance = async (
  url: string,
  query: Record<string, string | number> = {},
  options: RequestInit = {},
  requiresAuth = false,
) => {
  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    defaultHeaders.Authorization = `Bearer ${cookies().get("accessToken")}`;
  }

  const params = createParams(query);
  const fullUrl = params ? `${baseUrl}${url}?${params}` : `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...defaultHeaders,
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
