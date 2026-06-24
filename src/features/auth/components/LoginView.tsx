import Image from "next/image";
import { shadows } from "@/components/layout/shadowLayout";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { LoginForm, type LoginFormProps } from "./LoginForm";

type LoginViewProps = Pick<
  LoginFormProps,
  | "emailInvalid"
  | "emailInputProps"
  | "formError"
  | "isSubmitting"
  | "onSubmit"
  | "passwordInvalid"
  | "passwordInputProps"
> & {
  logo: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function LoginView({
  emailInvalid,
  emailInputProps,
  formError,
  isSubmitting,
  logo,
  onSubmit,
  passwordInvalid,
  passwordInputProps,
}: LoginViewProps) {
  return (
    <main className="mobile-scroll-screen auth-screen flex justify-center bg-[url('/images/top/background.png')] bg-cover bg-center px-6">
      <div className="flex w-full max-w-[26.25rem] flex-col items-center">
        <h1
          className="translate-y-3 font-[Inter] text-lg leading-7 font-normal tracking-normal text-white"
          style={{ textShadow: shadows.dropwhite }}
        >
          ログイン
        </h1>

        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          className="auth-logo mt-9 h-[6.25rem] w-[16.25rem] max-w-full"
        />

        <LoginForm
          emailInvalid={emailInvalid}
          emailInputProps={emailInputProps}
          formError={formError}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          passwordInvalid={passwordInvalid}
          passwordInputProps={passwordInputProps}
        />

        <p className="auth-secondary-text mt-12 font-[Inter] text-sm leading-none font-normal tracking-normal text-[#454545]">
          アカウントをお持ちでない方は
        </p>

        <GreenButton
          className="mt-4 max-w-[21rem] text-sm"
          style={{ height: "3.5rem" }}
        >
          アカウント作成
        </GreenButton>
      </div>
    </main>
  );
}
