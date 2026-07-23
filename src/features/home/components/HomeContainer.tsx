import { getCurrentPetAction } from "@/features/home/actions/GetCurrentPetAction";
import { getEvolutionStatusAction } from "@/features/home/actions/GetEvolutionStatusAction";
import { mockPets } from "@/features/home/mock/mockPets";
import { HomeView } from "./HomeView";

export async function HomeContainer() {
  const [petResult, evolutionResult] = await Promise.all([
    getCurrentPetAction(),
    getEvolutionStatusAction(),
  ]);
  const pets = petResult.success ? [petResult.pet, ...mockPets] : [];
  const error = !petResult.success
    ? petResult.error
    : !evolutionResult.success
      ? evolutionResult.error
      : undefined;

  return (
    <HomeView
      effectImage={{
        src: "/images/home/effect.png",
        width: 1125,
        height: 1143,
      }}
      error={error}
      evolutionStatus={
        evolutionResult.success ? evolutionResult.status : undefined
      }
      pet={petResult.success ? petResult.pet : undefined}
      pets={pets}
    />
  );
}
