"use client";

import Image from "next/image";
import { GetMyPet } from "@/components/ui/pet/GetMyPet";
import type { PetSnapshot } from "@/types/pet";

export type GrowStage = {
  stageKey: string;
  unlocked: boolean;
  stageName: string;
};

type GrowWayProps = {
  stages?: GrowStage[];
  petId: string;
  petName: string;
  color?: string;
};

const FIXED_STAGE_NAMES = ["あかご期", "あまえ期", "なまい期"];

export function GrowWay({ stages = [], petId, petName, color }: GrowWayProps) {
  return (
    <div className="flex mt-5 max-w-full text-[#4C4F5E] mb-24 gap-2">
      {FIXED_STAGE_NAMES.map((stageName, index) => {
        const keyword =
          index === 0 ? "あかご" : index === 1 ? "あまえ" : "なまい";
        const matched = stages.find(
          (s) => s.unlocked && s.stageName.includes(keyword),
        );

        const stageSnapshot: PetSnapshot = {
          petId: petId,
          petName: petName,
          currentStageKey: matched?.stageKey ?? "",
          currentStageNo: index + 1,
          nextStageKey: "",
          stageId: index + 1,
          canEvolve: false,
          color: color,
        };

        return (
          <div key={stageName} className="flex flex-col w-1/3 items-center">
            <p className="bg-white/30 py-2 px-4 mr-7 rounded-full text-center truncate">
              {stageName}
            </p>

            <div className="mt-2 w-full flex justify-center">
              {matched ? (
                <GetMyPet pet={stageSnapshot} size="md" />
              ) : (
                <Image
                  src="/images/report/noPet.png"
                  alt={stageName}
                  className="self-start w-full object-contain"
                  width={120}
                  height={120}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
