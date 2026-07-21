"use client";

import { useMemo } from "react";
import { colorCodeToHueRotate } from "@/utils/colorCodeToHueRotate";
import type { CurrentPet } from "@/features/home/api/GetCurrentPet";
import { useHomePetMovement } from "@/features/home/hooks/useHomePetMovement";
import { HomePet } from "./HomePet";

type HomePetFieldProps = {
  imageUrl: string;
  pets: CurrentPet[];
};

export function HomePetField({ imageUrl, pets }: HomePetFieldProps) {
  const petIds = useMemo(() => pets.map(({ id }) => id), [pets]);
  const { fieldRef, motions, petRef } = useHomePetMovement(petIds);

  return (
    <div
      className="pointer-events-none absolute top-[calc(1rem+var(--safe-area-top))] right-0 bottom-[calc(8.5rem+var(--safe-area-bottom))] left-0 z-10 overflow-hidden"
      ref={fieldRef}
    >
      {pets.map((pet, index) => {
        const motion = motions.find(({ id }) => id === pet.id);

        return (
          <HomePet
            key={pet.id}
            elementRef={index === 0 ? petRef : undefined}
            facing={motion?.facing}
            hueRotate={colorCodeToHueRotate(pet.color)}
            imageUrl={imageUrl}
            name={pet.name}
            x={motion?.x}
            y={motion?.y}
          />
        );
      })}
    </div>
  );
}
