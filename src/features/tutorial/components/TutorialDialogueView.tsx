import Image, { type StaticImageData } from "next/image";
import { BackButton } from "@/components/ui/button/BackButton";
import { DialoguePanel } from "@/components/ui/dialogue/DialoguePanel";
import { TutorialScreenLayout } from "./TutorialScreenLayout";

type TutorialDialogueViewProps = {
  doctorImage: StaticImageData;
  message: string;
  nextLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  petImage: StaticImageData;
  speaker?: string;
};

const emphasizedTerms = ["Dr.YOはかせ", "YO-YO（よーよー）"];

export function TutorialDialogueView({
  doctorImage,
  message,
  nextLabel,
  onBack,
  onNext,
  petImage,
  speaker,
}: TutorialDialogueViewProps) {
  return (
    <TutorialScreenLayout>
      <Image
        src={petImage}
        alt="ペット"
        priority
        className="absolute top-[calc(50%-1.5rem-3dvh)] left-1/2 h-[6.25rem] w-[7rem] -translate-x-1/2 -translate-y-1/2 object-contain"
      />

      <Image
        src={doctorImage}
        alt="ドクター"
        priority
        className="absolute right-[-0.75rem] bottom-[12.50rem] h-[12.5rem] w-[13.25rem] object-contain"
      />

      <div className="absolute right-4 bottom-[calc(2rem+var(--safe-area-bottom))] left-4 z-20">
        <BackButton className="mb-3" onClick={onBack} />
        <DialoguePanel
          emphasizedTerms={emphasizedTerms}
          message={message}
          nextLabel={nextLabel}
          onNext={onNext}
          speaker={speaker}
        />
      </div>
    </TutorialScreenLayout>
  );
}
