"use client";

import { useState } from "react";
import Image from "next/image";
import { TextButton } from "@/components/ui/button/TextButton";
import { NotificationSettingSection } from "@/features/setting/components/NotificationSettingSection";
import { PetLockedOverlay } from "@/features/setting/components/PetLockedOverlay";
import { SettingFooter } from "@/features/setting/components/SettingFooter";
import { PetSettingSection } from "@/components/ui/color/PetSettingSection";
import Link from "next/link";
import { BlueButton } from "@/components/ui/button/BlueButton";

type SettingViewProps = {
  petImage: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function SettingView({ petImage }: SettingViewProps) {
  const [hue, setHue] = useState(0);
  return (
    <main className="mobile-safe-scroll-screen relative overflow-hidden bg-[url('/images/background.png')] bg-cover bg-[position:center_top] bg-no-repeat px-4">
      <div className="mobile-safe-content mx-auto flex w-full max-w-[28rem] flex-col">
        <header className="flex items-center gap-5">
          <Image
            src="/icons/setting.svg"
            alt=""
            width={32}
            height={32}
            className="h-10 w-10"
          />
          <h1 className="text-lg leading-6 font-normal tracking-normal text-[#4C4F5E]">
            設定
          </h1>
        </header>

        <section className="mt-8">
          <h2 className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]">
            ペット設定
          </h2>
          <PetSettingSection hue={hue} onHueChange={setHue}></PetSettingSection>
        </section>
        <NotificationSettingSection />

        <TextButton className="mt-14 w-fit text-base leading-6 font-normal tracking-normal text-red-600 underline underline-offset-2">
          アカウント削除
        </TextButton>
        <Link href="/Home" className="w-full flex my-6">
          <BlueButton className="max-h-15 max-w-[85%] m-auto text-[18px]">
            設定を保存する
          </BlueButton>
        </Link>

        <SettingFooter petImage={petImage} />
      </div>
    </main>
  );
}
