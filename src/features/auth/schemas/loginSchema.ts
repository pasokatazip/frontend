import { z } from "zod";

export const loginErrorMessage = "メールアドレスまたはパスワードが違います";

export const loginSchema = z.object({
  email: z.email({ error: loginErrorMessage }),
  password: z.string().min(1, loginErrorMessage),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
