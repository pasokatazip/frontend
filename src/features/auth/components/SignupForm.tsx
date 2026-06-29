import type { ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { shadows } from "@/components/layout/shadowLayout";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { TextInput } from "@/components/ui/input/TextInput";

export type SignupFormProps = {
  emailInvalid?: boolean;
  emailInputProps: UseFormRegisterReturn<"email">;
  formError?: string;
  isSubmitting: boolean;
  onSubmit: NonNullable<ComponentProps<"form">["onSubmit"]>;
  passwordInvalid?: boolean;
  passwordInputProps: UseFormRegisterReturn<"password">;
};

export function SignupForm({
  emailInvalid,
  emailInputProps,
  formError,
  isSubmitting,
  onSubmit,
  passwordInvalid,
  passwordInputProps,
}: SignupFormProps) {
  return (
    <form
      className="auth-form mt-12 w-full rounded-[0.9rem] border border-white/30 bg-white/40 px-7 py-12 backdrop-blur-[10px]"
      onSubmit={onSubmit}
      style={{ boxShadow: shadows.black }}
    >
      <div className="space-y-6">
        <div>
          <label
            className="mb-3 block text-sm leading-none font-normal tracking-normal text-[#454545]"
            htmlFor="signup-email"
          >
            メールアドレス
          </label>
          <TextInput
            {...emailInputProps}
            id="signup-email"
            type="email"
            autoComplete="email"
            aria-invalid={emailInvalid ? "true" : "false"}
          />
        </div>

        <div>
          <label
            className="mb-3 block text-sm leading-none font-normal tracking-normal text-[#454545]"
            htmlFor="signup-password"
          >
            パスワード
          </label>
          <TextInput
            {...passwordInputProps}
            id="signup-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={passwordInvalid ? "true" : "false"}
          />
          <p
            className="mt-2 min-h-4 text-center text-xs text-red-600"
            aria-live="polite"
          >
            {formError}
          </p>
        </div>
      </div>

      <GreenButton
        className="auth-form-submit mt-16 max-w-full text-base"
        disabled={isSubmitting}
        style={{ height: "4rem" }}
        type="submit"
      >
        アカウント作成
      </GreenButton>
    </form>
  );
}
