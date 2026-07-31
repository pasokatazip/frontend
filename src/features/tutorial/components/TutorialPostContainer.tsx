"use client";

import { useState } from "react";
import { TutorialPostView } from "./TutorialPostView";
import { PetSnapshot } from "@/types/pet";

type TutorialPostContainerProps = {
  onSubmit?: (message: string) => void;
  pet: PetSnapshot;
};

export function TutorialPostContainer({
  onSubmit,
  pet,
}: TutorialPostContainerProps) {
  const [message, setMessage] = useState("");

  return (
    <TutorialPostView
      message={message}
      onMessageChange={setMessage}
      onSubmit={onSubmit}
      pet={pet}
    />
  );
}
