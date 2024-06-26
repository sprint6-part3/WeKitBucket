import { cookies } from "next/headers";

const baseUrl = process.env.BASE_URL;

const fetchInstance = async (url: string, options: RequestInit = {}, requiresAuth = false) => {
  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    defaultHeaders.Authorization = `Bearer ${cookies().get("accessToken")}`;
  }

  const response = await fetch(`${baseUrl}${url}`, {
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
