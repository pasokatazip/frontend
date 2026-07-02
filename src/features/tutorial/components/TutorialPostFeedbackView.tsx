import Image, { type StaticImageData } from "next/image";
import { DialoguePanel } from "@/components/ui/dialogue/DialoguePanel";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import { TutorialScreenLayout } from "./TutorialScreenLayout";

type TutorialPostFeedbackViewProps = {
  doctorImage: StaticImageData;
  onNext: () => void;
  petImage: StaticImageData;
};

export function TutorialPostFeedbackView({
  doctorImage,
  onNext,
  petImage,
}: TutorialPostFeedbackViewProps) {
  return (
    <TutorialScreenLayout>
      <TopMessagePanel>つぶやきました</TopMessagePanel>

      <Image
        src={petImage}
        alt="ペット"
        priority
        className="absolute top-[35%] left-1/2 h-[7.5rem] w-[8.5rem] -translate-x-1/2 object-contain"
      />

      <Image
        src={doctorImage}
        alt="ドクター"
        priority
        className="absolute right-0 bottom-[calc(11.25rem+var(--safe-area-bottom))] h-[11.25rem] w-[10rem] object-contain"
      />

      <div className="absolute right-2 bottom-[calc(0.75rem+var(--safe-area-bottom))] left-2 z-20">
        <DialoguePanel
          message="よい初つぶやきじゃった"
          onNext={onNext}
          speaker="Dr.YOはかせ"
        />
      </div>
    </TutorialScreenLayout>
  );
}
