import Image, { type StaticImageData } from "next/image";
import { BackButton } from "@/components/ui/button/BackButton";
import { DialoguePanel } from "@/components/ui/dialogue/DialoguePanel";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import { GetMyPet } from "@/components/ui/pet/GetMyPet";
import type { PetSnapshot } from "@/types/pet";

export type GatheringPetState = {
  facing: 1 | -1;
  onAnimationComplete?: () => void;
  pet: PetSnapshot;
  showYoImage: boolean;
  variant: "idle" | "walk" | "yo";
  visible: boolean;
};

type TutorialPetGatheringViewProps = {
  doctorImage: StaticImageData;
  effectImage: StaticImageData;
  isComplete: boolean;
  onBack: () => void;
  onNext: () => void;
  pets: GatheringPetState[];
};

const petPositions = [
  {
    className: "top-[42%] left-[44%]",
    entryTransform: "translate3d(-50%, -50%, 0)",
  },
  {
    className: "top-[30%] left-[70%]",
    entryTransform: "translate3d(13rem, -2rem, 0)",
  },
  {
    className: "top-[54%] left-[28%]",
    entryTransform: "translate3d(-13rem, 3rem, 0)",
  },
];

export function TutorialPetGatheringView({
  doctorImage,
  effectImage,
  isComplete,
  onBack,
  onNext,
  pets,
}: TutorialPetGatheringViewProps) {
  return (
    <main className="mobile-screen relative overflow-hidden bg-[url('/images/home/background.png')] bg-cover bg-center">
      <Image
        src={effectImage}
        alt=""
        priority
        className="pointer-events-none absolute right-0 bottom-0 left-0 w-full object-contain"
      />

      {pets.map((petState, index) => {
        const position = petPositions[index];

        return (
          <div
            className={`absolute z-10 h-28 w-32 transition-transform duration-[5500ms] ease-linear ${position.className}`}
            key={petState.pet.petId}
            style={{
              transform: petState.visible
                ? "translate3d(-50%, -50%, 0)"
                : position.entryTransform,
              visibility: petState.visible ? "visible" : "hidden",
            }}
          >
            {petState.visible ? (
              <GetMyPet
                className="h-full w-full"
                facing={petState.facing}
                onAnimationComplete={petState.onAnimationComplete}
                pet={petState.pet}
                showYoImage={petState.showYoImage}
                size="md"
                variant={petState.variant}
              />
            ) : null}
          </div>
        );
      })}

      {isComplete ? (
        <>
          <TopMessagePanel className="absolute -top-10 left-0 z-20">
            はじめましての群れができました！
          </TopMessagePanel>

          <Image
            src={doctorImage}
            alt="ドクター"
            priority
            className="absolute right-0 bottom-[calc(11.25rem+var(--safe-area-bottom))] z-20 h-[11.25rem] w-[10rem] object-contain"
          />

          <div className="absolute right-2 bottom-[calc(0.75rem+var(--safe-area-bottom))] left-2 z-30">
            <BackButton className="mb-3" onClick={onBack} />
            <DialoguePanel
              message="さっそく群れができたのう！"
              onNext={onNext}
              speaker="Dr.YOはかせ"
            />
          </div>
        </>
      ) : null}
    </main>
  );
}
