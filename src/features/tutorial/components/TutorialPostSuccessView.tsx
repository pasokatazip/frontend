import Image, { type StaticImageData } from "next/image";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import { TutorialScreenLayout } from "./TutorialScreenLayout";

type TutorialPostSuccessViewProps = {
  onNext: () => void;
  petImage: StaticImageData;
};

export function TutorialPostSuccessView({
  onNext,
  petImage,
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
        <Image
          src={petImage}
          alt="ペット"
          priority
          className="pointer-events-none h-full w-full object-contain"
        />
      </button>
    </TutorialScreenLayout>
  );
}
