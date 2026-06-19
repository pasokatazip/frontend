"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  loginErrorMessage,
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/loginSchema";
import { LoginView } from "./LoginView";

export function LoginContainer() {
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

  // APIの接続はauth/apiに切り出す
  function onSubmit(values: LoginFormValues) {
    void values;
    setError("root", {
      message: loginErrorMessage,
    });
  }

  const formError =
    errors.root?.message ??
    (errors.email || errors.password ? loginErrorMessage : undefined);

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
