"use client";

import Image from "next/image";
import { DialoguePanel } from "@/components/ui/dialogue/DialoguePanel";
import { BabyPetAnimation } from "@/components/ui/pet/animations/BabyPet/BabyPetAnimation";

type GrowViewProps = {
  dialogue: {
    message: string;
    speaker: string;
  };
  doctorImage: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function GrowView({ dialogue, doctorImage }: GrowViewProps) {
  return (
    <main className="mobile-screen relative overflow-hidden bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-[29rem]">
        <div className="absolute top-[35%] left-1/2 h-[7.5rem] w-[8.5rem] -translate-x-1/2">
          <BabyPetAnimation className="h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]" />
        </div>

        <Image
          src={doctorImage.src}
          alt={doctorImage.alt}
          width={doctorImage.width}
          height={doctorImage.height}
          priority
          className="absolute right-0 bottom-[calc(11.25rem+var(--safe-area-bottom))] h-[11.25rem] w-[10rem] object-contain"
        />

        <div className="absolute right-2 bottom-[calc(0.75rem+var(--safe-area-bottom))] left-2 z-20">
          <DialoguePanel
            message={dialogue.message}
            speaker={dialogue.speaker}
            typingInterval={24}
          />
        </div>
      </div>
    </main>
  );
}
