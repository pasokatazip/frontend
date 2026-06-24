import Image from "next/image";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { GreenButton } from "@/components/ui/button/GreenButton";

type TopViewProps = {
  logo: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function TopView({ logo }: TopViewProps) {
  return (
    <main className="mobile-screen flex items-center justify-center bg-[url('/images/top/background.png')] bg-cover bg-center px-10 pt-[calc(3rem+env(safe-area-inset-top))] pb-[calc(3rem+env(safe-area-inset-bottom))]">
      <div className="flex w-full max-w-[29rem] flex-col items-center gap-8">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          className="mb-8 w-[17.5rem] max-w-full"
        />

        <GreenButton className="max-w-full text-base" style={{ height: "4rem" }}>
          はじめから（アカウント作成）
        </GreenButton>
        <BlueButton className="max-w-full text-base" style={{ height: "4rem" }}>
          つづきから（ログイン）
        </BlueButton>
      </div>
    </main>
  );
}
