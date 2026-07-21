"use client";

import type { ComponentProps } from "react";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { PetSettingSection } from "@/components/ui/color/PetSettingSection";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import { BabyPetAnimation } from "@/components/ui/pet/animations/BabyPet/BabyPetAnimation";

type SetupViewProps = {
  growthMessage: string;
  hue: number;
  isSubmitting: boolean;
  onHueChange: (value: number) => void;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  petName: string;
  submitError?: string;
};

export function SetupView({
  growthMessage,
  hue,
  isSubmitting,
  onHueChange,
  onNameChange,
  onSubmit,
  petName,
  submitError,
}: SetupViewProps) {
  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (
    event,
  ) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <main className="mobile-screen bg-[url('/images/background.png')] bg-cover bg-center flex flex-col items-center justify-center">
      <form
        className="relative mx-auto min-h-[100dvh] w-full max-w-[29rem]"
        onSubmit={handleSubmit}
      >
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
            <PetSettingSection
              compact
              hue={hue}
              name={petName}
              onHueChange={onHueChange}
              onNameChange={onNameChange}
            />
            <div className="flex w-full flex-col items-center">
              <BlueButton
                className="m-auto my-3 max-h-12 max-w-[75%] text-base"
                disabled={isSubmitting}
                type="submit"
              >
                決定する
              </BlueButton>
              <p className="min-h-4 text-center text-xs text-red-600">
                {submitError}
              </p>
            </div>
          </footer>
        </div>
      </form>
    </main>
  );
}
