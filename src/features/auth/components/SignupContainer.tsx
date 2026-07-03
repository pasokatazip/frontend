"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupAction } from "@/features/auth/actions/SignupAction";
import {
  signupErrorMessage,
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/schemas/signupSchema";
import { SignupView } from "./SignupView";

export function SignupContainer() {
  const router = useRouter();
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

  async function onSubmit(values: SignupFormValues) {
    const result = await signupAction(values);

    if (result.success) {
      router.push("/Tutorial");
    } else {
      setError("root", { message: result.error });
    }
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
