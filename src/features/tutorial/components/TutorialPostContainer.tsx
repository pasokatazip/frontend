"use client";

import { useState } from "react";
import { TutorialPostView } from "./TutorialPostView";
import { PetSnapshot } from "@/types/pet";

type TutorialPostContainerProps = {
  onSubmit: (message: string) => void;
  pet: PetSnapshot;
};

export function TutorialPostContainer({
  onSubmit,
  pet,
}: TutorialPostContainerProps) {
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState<string>();

  function handleMessageChange(nextMessage: string) {
    setMessage(nextMessage);

    if (nextMessage.trim()) {
      setSubmitError(undefined);
    }
  }

  function handleSubmit(submittedMessage: string) {
    const trimmedMessage = submittedMessage.trim();

    if (!trimmedMessage) {
      setSubmitError("つぶやきを入力してください");
      return;
    }

    setSubmitError(undefined);
    onSubmit(trimmedMessage);
  }

  return (
    <TutorialPostView
      message={message}
      onMessageChange={handleMessageChange}
      onSubmit={handleSubmit}
      pet={pet}
      submitError={submitError}
    />
  );
}
