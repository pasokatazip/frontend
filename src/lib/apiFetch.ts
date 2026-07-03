import { getServerEnv } from "@/config/serverEnv";

export class ApiError extends Error {
  constructor(public readonly status: number) {
    super("API request failed");
    this.name = "ApiError";
  }
}

export async function apiFetch(path: string, init?: RequestInit) {
  const { PETYOYO_API_URL } = getServerEnv();
  const signal = init?.signal ?? AbortSignal.timeout(10_000);
  const response = await fetch(new URL(path, PETYOYO_API_URL), {
    ...init,
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return response;
}
