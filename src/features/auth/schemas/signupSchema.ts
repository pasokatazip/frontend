import { z } from "zod";

export const signupErrorMessage = "パスワードは英数字8文字以上で入力してください";
export const emailFormatErrorMessage = "正しいメールアドレスを入力してください";

export const signupSchema = z.object({
  email: z.email({ error: emailFormatErrorMessage }),
  password: z
    .string()
    .min(8, signupErrorMessage)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, signupErrorMessage),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
