"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPetAction } from "@/features/setup/actions/CreatePetAction";
import { SetupView } from "./SetupView";

export function SetupContainer() {
  const router = useRouter();
  const [hue, setHue] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [petName, setPetName] = useState("ペット名");
  const [submitError, setSubmitError] = useState<string>();

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(undefined);

    const result = await createPetAction({
      hueRotate: hue,
      name: petName,
    });

    setIsSubmitting(false);

    if (result.success) {
      router.replace("/Home");
      return;
    }

    setSubmitError(result.error);
  }

  return (
    <SetupView
      growthMessage="YO-YOに名前をつけましょう"
      hue={hue}
      isSubmitting={isSubmitting}
      onHueChange={setHue}
      onNameChange={setPetName}
      onSubmit={handleSubmit}
      petName={petName}
      submitError={submitError}
    />
  );
}
