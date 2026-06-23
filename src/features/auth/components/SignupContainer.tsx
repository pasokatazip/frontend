"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  signupErrorMessage,
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/schemas/signupSchema";
import { SignupView } from "./SignupView";

export function SignupContainer() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<SignupFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  // APIの接続はauth/apiに切り出す
  function onSubmit(values: SignupFormValues) {
    void values;
    setError("root", {
      message: signupErrorMessage,
    });
  }

  const formError =
    errors.root?.message ??
    errors.email?.message ??
    (errors.password ? signupErrorMessage : undefined);

  return (
    <SignupView
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
