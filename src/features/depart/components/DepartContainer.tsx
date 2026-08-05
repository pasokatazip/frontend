import { redirect } from "next/navigation";
import { getLatestPetSouvenir } from "@/features/depart/api/GetLatestPetSouvenir";
import { getCurrentPetAction } from "@/features/home/actions/GetCurrentPetAction";
import { getEvolutionStatusAction } from "@/features/home/actions/GetEvolutionStatusAction";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";
import { DepartController } from "./DepartController";

export async function DepartContainer() {
  const token = await getAuthTokenCookie();

  if (!token) {
    redirect("/Login");
  }
  if (!getPetIdFromToken(token)) {
    redirect("/Setup");
  }

  const [petResult, evolutionResult, latestSouvenirResult] = await Promise.all([
    getCurrentPetAction(),
    getEvolutionStatusAction(),
    getLatestPetSouvenir(token),
  ]);

  if (!petResult.success || !petResult.pet.departure?.canDepart) {
    redirect("/Home");
  }
  if (!evolutionResult.success) {
    redirect("/Home");
  }

  return (
    <DepartController
      pet={{
        color: petResult.pet.color,
        currentStageKey: evolutionResult.status.currentStageKey,
        latestSouvenir: latestSouvenirResult.souvenir,
        name: petResult.pet.name,
      }}
    />
  );
}
