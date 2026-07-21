import { getCurrentPetAction } from "@/features/home/actions/GetCurrentPetAction";
import { mockPets } from "@/features/home/mock/mockPets";
import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import { HomeView } from "./HomeView";

export async function HomeContainer() {
  const result = await getCurrentPetAction();
  const [petImageUrl] = getPetFrameUrls({
    folderName: "BabyPetWalk",
    frameCount: 1,
  });
  const pets = result.success ? [result.pet, ...mockPets] : [];

  return (
    <HomeView
      effectImage={{
        src: "/images/home/effect.png",
        width: 1125,
        height: 1143,
      }}
      error={result.success ? undefined : result.error}
      pets={pets}
      petImageUrl={petImageUrl}
    />
  );
}
