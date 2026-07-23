"use client";

import { clsx } from "clsx";
import { useEffect, useMemo, useState } from "react";
import { colorCodeToHueRotate } from "@/utils/colorCodeToHueRotate";
import type { CurrentPet } from "@/features/home/api/GetCurrentPet";
import { useHomePetMovement } from "@/features/home/hooks/useHomePetMovement";
import { getMockPetStageKey } from "@/features/home/mock/getMockPetStageKey";
import {
  createGroupedPetPositions,
  type PetPosition,
} from "@/features/home/utils/petMovement";
import { HomePet } from "./HomePet";

type HomePetFieldProps = {
  currentStageKey: string;
  grouped?: boolean;
  pets: CurrentPet[];
};

const groupedPetArea = {
  height: 232,
  width: 270,
};

export function HomePetField({
  currentStageKey,
  grouped = false,
  pets,
}: HomePetFieldProps) {
  const petIds = useMemo(() => pets.map(({ id }) => id), [pets]);
  const [groupedPositions, setGroupedPositions] = useState<PetPosition[]>([]);
  const [walkingPetIds, setWalkingPetIds] = useState<Set<string>>(new Set());
  const allGroupedPetsAreWalking =
    grouped && pets.length > 0 && walkingPetIds.size >= pets.length;
  const initialPositionArea = useMemo(
    () =>
      grouped
        ? {
            ...groupedPetArea,
            positions: groupedPositions,
          }
        : undefined,
    [grouped, groupedPositions],
  );
  const { fieldRef, motions, petRef } = useHomePetMovement(petIds, {
    enabled: !grouped || allGroupedPetsAreWalking,
    initialPositionArea,
  });

  useEffect(() => {
    if (grouped) {
      setGroupedPositions(createGroupedPetPositions(petIds));
      setWalkingPetIds(new Set());
    }
  }, [grouped, petIds]);

  function startWalking(petId: string) {
    setWalkingPetIds((currentWalkingPetIds) => {
      const nextWalkingPetIds = new Set(currentWalkingPetIds);

      nextWalkingPetIds.add(petId);
      return nextWalkingPetIds;
    });
  }

  function getStageKey(pet: CurrentPet, index: number) {
    return index === 0
      ? currentStageKey
      : getMockPetStageKey(pet.stageId, index - 1);
  }

  return (
    <div
      className={clsx(
        "pointer-events-none absolute right-0 bottom-[calc(8.5rem+var(--safe-area-bottom))] left-0 z-10 overflow-hidden",
        grouped
          ? "top-50"
          : "top-[calc(1rem+var(--safe-area-top))]",
      )}
      ref={fieldRef}
    >
      {pets.map((pet, index) => {
        const motion = motions.find(({ id }) => id === pet.id);

        return (
          <HomePet
            key={pet.id}
            className={grouped ? "absolute top-0 left-0" : undefined}
            elementRef={index === 0 ? petRef : undefined}
            facing={
              grouped && !allGroupedPetsAreWalking ? 1 : motion?.facing
            }
            hueRotate={colorCodeToHueRotate(pet.color)}
            layout={grouped ? "group" : "field"}
            name={pet.name}
            onWalkStart={
              grouped && !walkingPetIds.has(pet.id)
                ? () => startWalking(pet.id)
                : undefined
            }
            stageKey={getStageKey(pet, index)}
            variant={grouped ? "yo" : "walk"}
            x={motion?.x}
            y={motion?.y}
          />
        );
      })}
    </div>
  );
}
