"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePetProgressStore } from "@/stores/usePetProgressStore";
import { usePetProgressHydration } from "@/hooks/usePetProgressHydration";
import { GrowCompleteView } from "./GrowCompleteView";

export function GrowCompleteContainer() {
  const router = useRouter();
  const hasHydrated = usePetProgressHydration();
  const evolutionFlow = usePetProgressStore((state) => state.evolutionFlow);
  const setEvolutionFlow = usePetProgressStore(
    (state) => state.setEvolutionFlow,
  );
  const snapshot = usePetProgressStore((state) => state.snapshot);
  const petName = snapshot?.petName ?? "YO-YO";
  const stageKey = evolutionFlow?.toStageKey ?? "akago";

  useEffect(() => {
    if (hasHydrated && evolutionFlow?.step !== "complete") {
      router.replace("/Home");
    }
  }, [evolutionFlow?.step, hasHydrated, router]);

  if (!hasHydrated || evolutionFlow?.step !== "complete") {
    return null;
  }

  function handleNext() {
    setEvolutionFlow();
    router.push("/Home");
  }

  return (
    <GrowCompleteView
      dialogue={{
        message: "ナイスYO-YO！",
        speaker: "Dr.YOはかせ",
      }}
      doctorImage={{
        alt: "Dr.YOはかせ",
        height: 512,
        src: "/images/subscription/doctor.png",
        width: 512,
      }}
      growthMessage={`${petName}が成長した！`}
      onNext={handleNext}
      stageKey={stageKey}
    />
  );
}
