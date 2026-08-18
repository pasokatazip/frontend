"use client";

import { GrowRecordView } from "./GrowRecordView";
import { usePetSession } from "@/hooks/usePetSession";
import type { PetSnapshot } from "@/types/pet";
import { usePetEvolutions } from "../hooks/usePetEvolutions";

export function GrowRecordContainer() {
  const { data } = usePetEvolutions();
  const sessionPet = usePetSession();

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`;
  };

  // APIのデータから最初のステージの作成日（開始日）created_atを取得、仮置きだからサブスク対応のときに修正するおy
  const firstStage = data?.stages?.[0];
  const startDateStr =
    firstStage?.evolved_at || (data?.evolutions?.[0] as any)?.created_at;

  const today = formatDate(new Date().toISOString());
  const startDate = formatDate(startDateStr) || today;

  const period = `${startDate} - ${today}`;

  const petName = sessionPet.petName || "ペット";

  const prevPet = () => {};
  const nextPet = () => {};

  const stages =
    data?.stages?.map((s) => ({
      stageKey: s.stage_key,
      unlocked: s.unlocked,
      stageName: s.name,
    })) ?? [];

  const currentStage =
    data?.stages?.find((s) => s.current) || data?.stages?.[0];

  const currentPetSnapshot: PetSnapshot = {
    petId: data?.pet_id || sessionPet.petId,
    petName: petName,
    currentStageKey: currentStage?.stage_key || sessionPet.currentStageKey,
    currentStageNo: currentStage?.stage_no || 1,
    nextStageKey: "",
    stageId: currentStage?.id || 1,
    canEvolve: false,
    color: sessionPet.color,
  };

  return (
    <GrowRecordView
      GrowRecordInfo={{
        period,
        petName,
        prevPet,
        nextPet,
        stages,
      }}
      currentPet={currentPetSnapshot}
      petId={data?.pet_id || sessionPet.petId}
      petName={petName}
      color={sessionPet.color}
      lastSouvenir={{
        unlocked: true,
        src: "/images/souvenir/secret.png",
        alt: "りんご",
        width: 60,
        height: 60,
      }}
    />
  );
}
