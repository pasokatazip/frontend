"use client";

import { useEffect, useState } from "react";
import { GrowRecordView } from "./GrowRecordView";
import { usePetSession } from "@/hooks/usePetSession";
import type { PetSnapshot } from "@/types/pet";
import { usePetEvolutions } from "../hooks/usePetEvolutions";
import { getAllPetsAction } from "../actions/getAllPetsAction";

type GrowRecordControllerProps = {
  isSubscriptionActive: boolean;
};

export function GrowRecordController({
  isSubscriptionActive,
}: GrowRecordControllerProps) {
  const sessionPet = usePetSession();

  const [selectedPetId, setSelectedPetId] = useState(sessionPet.petId);

  const [pets, setPets] = useState<{ name: string; pet_id: string }[]>([]);

  useEffect(() => {
    if (!isSubscriptionActive) return;

    const fetchPets = async () => {
      try {
        const result = await getAllPetsAction();
        setPets(result.pets);
      } catch {
        setPets([]);
      }
    };

    void fetchPets();
  }, [isSubscriptionActive]);

  const { data } = usePetEvolutions({
    petId: selectedPetId,
    isSubscribed: isSubscriptionActive,
  });

  useEffect(() => {
    if (!isSubscriptionActive || pets.length === 0) return;

    const currentPetExists = pets.some((pet) => pet.pet_id === selectedPetId);

    if (!currentPetExists) {
      setSelectedPetId(pets[0].pet_id);
    }
  }, [isSubscriptionActive, pets, selectedPetId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return null;

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}/${m}/${d}`;
  };

  const firstCreatedAt = data?.evolutions
    ?.map((evolution) => evolution.created_at)
    .filter(Boolean)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];

  const lastEvolvedAt = data?.stages
    ?.map((stage) => stage.evolved_at)
    .filter((date): date is string => Boolean(date))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .at(-1);

  const startDate = formatDate(firstCreatedAt);
  const endDate = formatDate(lastEvolvedAt);

  const period =
    startDate && endDate
      ? `${startDate} - ${endDate}`
      : startDate
        ? `${startDate} -`
        : endDate
          ? `- ${endDate}`
          : "";

  const selectedPet = pets.find((pet) => pet.pet_id === selectedPetId);

  const petName =
    isSubscriptionActive && selectedPet
      ? selectedPet.name
      : sessionPet.petName || "ペット";

  const prevPet = () => {
    if (!isSubscriptionActive || pets.length === 0) return;

    const currentIndex = pets.findIndex((pet) => pet.pet_id === selectedPetId);

    if (currentIndex === -1 || currentIndex >= pets.length - 1) {
      return;
    }

    setSelectedPetId(pets[currentIndex + 1].pet_id);
  };

  const nextPet = () => {
    if (!isSubscriptionActive || pets.length === 0) return;

    const currentIndex = pets.findIndex((pet) => pet.pet_id === selectedPetId);

    if (currentIndex <= 0) return;

    setSelectedPetId(pets[currentIndex - 1].pet_id);
  };

  const stages =
    data?.stages?.map((stage) => ({
      stageKey: stage.stage_key,
      unlocked: stage.unlocked,
      stageName: stage.name,
    })) ?? [];

  const currentStage =
    data?.stages?.find((stage) => stage.current) ?? data?.stages?.[0];

  const currentPetSnapshot: PetSnapshot = {
    petId: data?.pet_id ?? sessionPet.petId,
    petName,
    currentStageKey: currentStage?.stage_key ?? sessionPet.currentStageKey,
    currentStageNo: currentStage?.stage_no ?? 1,
    nextStageKey: "",
    stageId: currentStage?.id ?? 1,
    canEvolve: false,
    color: data?.color ?? sessionPet.color,
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
      petId={data?.pet_id ?? sessionPet.petId}
      petName={petName}
      color={data?.color ?? sessionPet.color}
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
