import { redirect } from "next/navigation";
import { DepartContainer } from "@/features/depart/components/DepartContainer";
import { getCurrentPetAction } from "@/features/home/actions/GetCurrentPetAction";
import { getEvolutionStatusAction } from "@/features/home/actions/GetEvolutionStatusAction";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";

export default async function DepartPage() {
  const token = await getAuthTokenCookie();

  if (!token) {
    redirect("/Login");
  }
  if (!getPetIdFromToken(token)) {
    redirect("/Setup");
  }

  const [petResult, evolutionResult] = await Promise.all([
    getCurrentPetAction(),
    getEvolutionStatusAction(),
  ]);

  if (!petResult.success || !petResult.pet.departure?.canDepart) {
    redirect("/Home");
  }
  if (!evolutionResult.success) {
    redirect("/Home");
  }

  return (
    <DepartContainer
      pet={{
        color: petResult.pet.color,
        currentStageKey: evolutionResult.status.currentStageKey,
        name: petResult.pet.name,
      }}
    />
  );
}
