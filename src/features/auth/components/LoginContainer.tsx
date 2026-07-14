"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginAction } from "@/features/auth/actions/LoginAction";
import {
  loginErrorMessage,
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/loginSchema";
import { LoginView } from "./LoginView";

export function LoginContainer() {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    const result = await loginAction(values);

    if (result.success) {
      router.push("/Home");
    } else {
      setError("root", { message: result.error });
    }
  }

  const formError =
    errors.root?.message ??
    errors.email?.message ??
    (errors.password ? loginErrorMessage : undefined);

  return (
    <LoginView
      emailInvalid={Boolean(errors.email)}
      emailInputProps={register("email")}
      formError={formError}
      isSubmitting={isSubmitting}
      logo={{
        alt: "YoYo!",
        height: 240,
        src: "/images/top/logo.png",
        width: 630,
      }}
      onSubmit={handleSubmit(onSubmit)}
      passwordInvalid={Boolean(errors.password)}
      passwordInputProps={register("password")}
    />
  );
}
