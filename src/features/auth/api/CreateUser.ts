import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import type { SignupFormValues } from "../schemas/signupSchema";

const createUserResponseSchema = z.object({
  token: z.string().min(1),
});

export async function createUser(values: SignupFormValues) {
  const response = await apiFetch("/users", {
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const body = createUserResponseSchema.parse(await response.json());

  return body.token;
}
