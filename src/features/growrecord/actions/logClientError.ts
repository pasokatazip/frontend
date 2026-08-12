"use server";

import { logServerError } from "@/lib/serverLogger";

export async function logClientError(message: string, error: unknown) {
  logServerError(message, error);
}
