"use client";

import { useState } from "react";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { PetSettingSection } from "@/components/ui/color/PetSettingSection";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import Image from "next/image";
import Link from "next/link";
import { BabyPetAnimation } from "@/components/ui/pet/BabyPetAnimation";

type SetupViewProps = {
  growthMessage: string;
};

export function SetupView({ growthMessage }: SetupViewProps) {
  const [hue, setHue] = useState(0);

  return (
    <main className="mobile-screen bg-[url('/images/background.png')] bg-cover bg-center flex flex-col items-center justify-center">
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-[29rem]">
        <TopMessagePanel className="fixed top-0 right-0 left-0">
          {growthMessage}
        </TopMessagePanel>
        <div className="m-4">
          <div className="absolute top-[35%] left-1/2 h-[7.5rem] w-[8.5rem] -translate-x-1/2">
            <BabyPetAnimation
              hueRotate={hue}
              className="h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]"
            />
          </div>

          <footer className="absolute m-4 right-2 bottom-[calc(0.75rem+var(--safe-area-bottom))] left-2 z-20">
            <PetSettingSection hue={hue} onHueChange={setHue} />
            <Link href="/GrowRecord" className="w-full flex m">
              <BlueButton className="max-h-15 max-w-[85%] m-auto my-5">
                決定する
              </BlueButton>
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
