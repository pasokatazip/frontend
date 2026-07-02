"use client";

import type { StaticImageData } from "next/image";
import { useState } from "react";
import { TutorialPostView } from "./TutorialPostView";

type TutorialPostContainerProps = {
  onSubmit?: (message: string) => void;
  petImage: StaticImageData;
};

export function TutorialPostContainer({
  onSubmit,
  petImage,
}: TutorialPostContainerProps) {
  const [message, setMessage] = useState("");

  return (
    <TutorialPostView
      message={message}
      onMessageChange={setMessage}
      onSubmit={onSubmit}
      petImage={petImage}
    />
  );
}
