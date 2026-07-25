import Image, { type StaticImageData } from "next/image";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import { TutorialScreenLayout } from "./TutorialScreenLayout";
import { PetSnapshot } from "@/types/pet";
import { GetMyPet } from "@/components/ui/pet/GetMyPet";

type TutorialPostSuccessViewProps = {
  onNext: () => void;
  pet: PetSnapshot;
};

export function TutorialPostSuccessView({
  onNext,
  pet,
}: TutorialPostSuccessViewProps) {
  return (
    <TutorialScreenLayout>
      <TopMessagePanel>つぶやきました</TopMessagePanel>

      <button
        aria-label="つぎへ進む"
        className="absolute top-[38%] left-1/2 h-[7.5rem] w-[8.5rem] -translate-x-1/2 touch-manipulation"
        onClick={onNext}
        type="button"
      >
        <GetMyPet
          pet={pet}
          size="md"
          className="pointer-events-none h-full w-full object-contain"
        />
      </button>
    </TutorialScreenLayout>
  );
}
