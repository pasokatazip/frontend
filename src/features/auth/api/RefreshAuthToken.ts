import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const refreshAuthTokenResponseSchema = z.object({
  token: z.string().min(1),
});

export async function refreshAuthToken(token: string) {
  const response = await apiFetch("/users/login", {
    body: JSON.stringify({}),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const body = refreshAuthTokenResponseSchema.parse(await response.json());

  return body.token;
}
