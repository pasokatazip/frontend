import Image from "next/image";
import { shadows } from "@/components/layout/shadowLayout";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { SignupForm, type SignupFormProps } from "./SignupForm";
import Link from "next/link";

type SignupViewProps = Pick<
  SignupFormProps,
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

export function SignupView({
  emailInvalid,
  emailInputProps,
  formError,
  isSubmitting,
  logo,
  onSubmit,
  passwordInvalid,
  passwordInputProps,
}: SignupViewProps) {
  return (
    <main className="mobile-scroll-screen auth-screen flex justify-center bg-[url('/images/top/background.png')] bg-cover bg-center px-6">
      <div className="flex w-full max-w-[26.25rem] flex-col items-center">
        <h1
          className="translate-y-3 text-lg leading-7 font-normal tracking-normal text-white"
          style={{ textShadow: shadows.dropwhite }}
        >
          アカウント作成
        </h1>

        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          className="auth-logo mt-9 h-[6.25rem] w-[16.25rem] max-w-full"
        />

        <SignupForm
          emailInvalid={emailInvalid}
          emailInputProps={emailInputProps}
          formError={formError}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          passwordInvalid={passwordInvalid}
          passwordInputProps={passwordInputProps}
        />

        <p className="auth-secondary-text mt-6 text-[13px] leading-none font-normal tracking-normal text-[#454545]">
          アカウントをお持ちの方は
        </p>

        <BlueButton
          className="mt-3 max-w-[20rem] shrink-0 text-[13px]"
          style={{ height: "3rem" }}
        >
          <Link href="/Login">ログイン</Link>
        </BlueButton>
      </div>
    </main>
  );
}
