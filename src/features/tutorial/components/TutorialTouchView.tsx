import Image, { type StaticImageData } from "next/image";
import { TutorialScreenLayout } from "./TutorialScreenLayout";

type TutorialTouchViewProps = {
  onPetClick: () => void;
  petImage: StaticImageData;
  touchIcon: StaticImageData;
};

export function TutorialTouchView({
  onPetClick,
  petImage,
  touchIcon,
}: TutorialTouchViewProps) {
  return (
    <TutorialScreenLayout className="z-10 flex items-center justify-center px-5">
      <div className="relative flex -translate-y-[3dvh] flex-col items-center">
        <Image
          src={touchIcon}
          alt="タッチする"
          priority
          className="pointer-events-none absolute -top-[3.25rem] left-[calc(50%+2.5rem)] h-[3.5rem] w-[3.5rem] object-contain"
        />

        <button
          aria-label="ペットをタッチする"
          className="relative z-10 inline-flex h-[6.25rem] w-[7rem] touch-manipulation cursor-pointer items-center justify-center select-none"
          onClick={onPetClick}
          type="button"
        >
          <Image
            src={petImage}
            alt="ペット"
            priority
            className="pointer-events-none h-[6.25rem] w-[7rem] object-contain"
          />
        </button>

        <p className="mt-6 text-base leading-6 font-normal tracking-normal text-[#00B7AD] [text-shadow:0_0_4px_rgba(0,183,173,0.3)]">
          タッチしてね！
        </p>
      </div>
    </TutorialScreenLayout>
  );
}
