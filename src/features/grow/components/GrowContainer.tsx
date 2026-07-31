"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePetProgressStore } from "@/stores/usePetProgressStore";
import { usePetProgressHydration } from "@/hooks/usePetProgressHydration";
import { GrowView } from "./GrowView";

export function GrowContainer() {
  const router = useRouter();
  const isLeavingRef = useRef(false);
  const hasHydrated = usePetProgressHydration();
  const evolutionFlow = usePetProgressStore((state) => state.evolutionFlow);
  const setEvolutionFlow = usePetProgressStore(
    (state) => state.setEvolutionFlow,
  );
  const snapshot = usePetProgressStore((state) => state.snapshot);
  const petName = snapshot?.petName ?? "YO-YO";
  const stageKey = evolutionFlow?.fromStageKey ?? "akago";

  useEffect(() => {
    if (
      hasHydrated &&
      !isLeavingRef.current &&
      evolutionFlow?.step !== "grow"
    ) {
      router.replace("/Home");
    }
  }, [evolutionFlow?.step, hasHydrated, router]);

  if (!hasHydrated || evolutionFlow?.step !== "grow") {
    return null;
  }

  function handleNext() {
    if (!evolutionFlow) {
      return;
    }

    isLeavingRef.current = true;
    setEvolutionFlow({
      ...evolutionFlow,
      step: "complete",
    });
    router.push("/GrowComplete");
  }

  return (
    <GrowView
      dialogue={{
        message: `おや...${petName}のようすが...？`,
        speaker: "Dr.YOはかせ",
      }}
      doctorImage={{
        alt: "Dr.YOはかせ",
        height: 512,
        src: "/images/subscription/doctor.png",
        width: 512,
      }}
      onNext={handleNext}
      stageKey={stageKey}
    />
  );
}
