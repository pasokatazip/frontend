import Image, { type StaticImageData } from "next/image";
import { clsx } from "clsx";
import { BackButton } from "@/components/ui/button/BackButton";
import { DialoguePanel } from "@/components/ui/dialogue/DialoguePanel";

type TutorialLessonViewProps = {
  compactImage?: boolean;
  doctorImage: StaticImageData;
  effectImage: StaticImageData;
  lessonImage: StaticImageData;
  lessonImageAlt: string;
  message: string;
  nextLabel?: string;
  onBack: () => void;
  onNext?: () => void;
};

export function TutorialLessonView({
  compactImage = false,
  doctorImage,
  effectImage,
  lessonImage,
  lessonImageAlt,
  message,
  nextLabel,
  onBack,
  onNext,
}: TutorialLessonViewProps) {
  return (
    <main className="mobile-screen relative overflow-hidden bg-[url('/images/home/background.png')] bg-cover bg-center">
      <div className="relative mx-auto h-full w-full max-w-[29rem] overflow-hidden">
        <Image
          src={effectImage}
          alt=""
          priority
          className="absolute right-0 bottom-0 left-0 w-full object-contain"
        />

        <Image
          src={lessonImage}
          alt={lessonImageAlt}
          priority
          className={clsx(
            "absolute left-1/2 -translate-x-1/2 object-contain",
            compactImage
              ? "top-[15%] w-[calc(100%_-_4rem)] max-w-[22rem]"
              : "top-[21%] w-[calc(100%_-_2rem)] max-w-[25rem]",
          )}
        />

        <Image
          src={doctorImage}
          alt="ドクター"
          priority
          className="absolute right-0 bottom-[calc(11.25rem+var(--safe-area-bottom))] h-[11.25rem] w-[10rem] object-contain"
        />

        <div className="absolute right-3 bottom-[calc(0.75rem+var(--safe-area-bottom))] left-3 z-20">
          <BackButton className="mb-3" onClick={onBack} />
          <DialoguePanel
            message={message}
            nextLabel={nextLabel}
            onNext={onNext}
            speaker="Dr.YOはかせ"
          />
        </div>
      </div>
    </main>
  );
}
