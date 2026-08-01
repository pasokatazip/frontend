import { redirect } from "next/navigation";
import { DepartContainer } from "@/features/depart/components/DepartContainer";
import { getLatestPetSouvenir } from "@/features/depart/api/GetLatestPetSouvenir";
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
  if (!latestSouvenirResult.souvenir) {
    throw new Error("Active pet must have at least one souvenir");
  }

  return (
    <DepartContainer
      pet={{
        color: petResult.pet.color,
        currentStageKey: evolutionResult.status.currentStageKey,
        latestSouvenir: latestSouvenirResult.souvenir,
        name: petResult.pet.name,
      }}
    />
  );
}
