import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import type { LoginFormValues } from "../schemas/loginSchema";

const loginUserResponseSchema = z.object({
  token: z.string().min(1),
});

export async function loginUser(values: LoginFormValues) {
  const response = await apiFetch("/users/login", {
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const body = loginUserResponseSchema.parse(await response.json());

  return body.token;
}
