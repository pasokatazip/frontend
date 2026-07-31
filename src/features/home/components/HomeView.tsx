import Image from "next/image";
import { Footer } from "@/components/Footer";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import type { CurrentPet } from "@/features/home/api/GetCurrentPet";
import type { EvolutionStatus } from "@/features/home/api/GetEvolutionStatus";
import { HomeProgressController } from "./HomeProgressController";
import { HomePetField } from "./HomePetField";

type HomeViewProps = {
  effectImage: {
    height: number;
    src: string;
    width: number;
  };
  error?: string;
  evolutionStatus?: EvolutionStatus;
  pet?: CurrentPet;
  pets: CurrentPet[];
};

export function HomeView({
  effectImage,
  error,
  evolutionStatus,
  pet,
  pets,
}: HomeViewProps) {
  const currentGroup = pet?.current_group;

  return (
    <>
      <main className="mobile-screen relative overflow-hidden bg-[url('/images/home/background.png')] bg-cover bg-center">
        {pet && evolutionStatus ? (
          <HomeProgressController
            evolutionStatus={evolutionStatus}
            pet={pet}
          />
        ) : null}
        <Image
          src={effectImage.src}
          alt=""
          width={effectImage.width}
          height={effectImage.height}
          loading="eager"
          className="mobile-safe-bottom-0 pointer-events-none fixed left-0 z-[15] max-w-fit"
        />
        {currentGroup ? (
          <TopMessagePanel className="absolute -top-10 left-0 z-20">
            {currentGroup.display_name}でYO-YO!中です
          </TopMessagePanel>
        ) : null}
        <HomePetField
          currentStageKey={evolutionStatus?.currentStageKey ?? "akago"}
          grouped={Boolean(currentGroup)}
          pets={pets}
        />
        {error ? (
          <p
            aria-live="polite"
            className="absolute top-1/2 left-1/2 z-10 w-full -translate-x-1/2 text-center text-sm text-red-600"
          >
            {error}
          </p>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
