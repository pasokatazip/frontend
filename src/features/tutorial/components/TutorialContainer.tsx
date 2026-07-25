"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import homeEffectImage from "@public/images/home/effect.png";
import doctorImage from "@public/images/subscription/doctor.png";
import touchIcon from "@public/images/tutorial/touchIcon.png";
import {
  dialogues,
  lessons,
  type Dialogue,
  type DialogueId,
  type Lesson,
  type LessonId,
  type TutorialDestination,
  type TutorialStep,
} from "../config/tutorialSteps";
import { TutorialDialogueView } from "./TutorialDialogueView";
import { TutorialLessonView } from "./TutorialLessonView";
import { TutorialPostContainer } from "./TutorialPostContainer";
import { TutorialPostFeedbackView } from "./TutorialPostFeedbackView";
import { TutorialPostSuccessView } from "./TutorialPostSuccessView";
import { TutorialTouchView } from "./TutorialTouchView";
import { PetSnapshot } from "@/types/pet";

const tutorialPet: PetSnapshot = {
  petId: "tutorial-pet",
  petName: "ペット",
  currentStageKey: "baby",
  currentStageNo: 1,
  nextStageKey: "",
  stageId: 1,
  canEvolve: false,
};

export function TutorialContainer() {
  const router = useRouter();
  const [step, setStep] = useState<TutorialStep>("touch");

  function moveTo(destination: TutorialDestination) {
    if (destination === "/Home") {
      router.push(destination);
    } else {
      setStep(destination);
    }
  }

  function renderDialogue(dialogueId: DialogueId) {
    const dialogue: Dialogue = dialogues[dialogueId];

    return (
      <TutorialDialogueView
        doctorImage={doctorImage}
        message={dialogue.message}
        nextLabel={dialogue.nextLabel}
        pet={tutorialPet}
        onBack={() => moveTo(dialogue.previous)}
        onNext={() => moveTo(dialogue.next)}
        speaker={dialogue.speaker}
      />
    );
  }

  function renderLesson(lessonId: LessonId) {
    const lesson: Lesson = lessons[lessonId];

    return (
      <TutorialLessonView
        compactImage
        doctorImage={doctorImage}
        effectImage={homeEffectImage}
        lessonImage={lesson.image}
        lessonImageAlt={lesson.imageAlt}
        message={lesson.message}
        nextLabel={lesson.nextLabel}
        onBack={() => moveTo(lesson.previous)}
        onNext={() => moveTo(lesson.next)}
      />
    );
  }

  const renderStrategies: Record<TutorialStep, () => ReactNode> = {
    description: () => renderDialogue("description"),
    empty: () => renderDialogue("empty"),
    goal: () => renderLesson("goal"),
    introduction: () => renderDialogue("introduction"),
    post: () => (
      <TutorialPostContainer
        onSubmit={() => moveTo("postSuccess")}
        pet={tutorialPet}
      />
    ),
    postFeedback: () => (
      <TutorialPostFeedbackView
        doctorImage={doctorImage}
        onNext={() => moveTo("routine")}
        pet={tutorialPet}
      />
    ),
    postSuccess: () => (
      <TutorialPostSuccessView
        onNext={() => moveTo("postFeedback")}
        pet={tutorialPet}
      />
    ),
    prompt: () => renderDialogue("prompt"),
    reaction: () => renderDialogue("reaction"),
    report: () => renderLesson("report"),
    routine: () => renderLesson("routine"),
    touch: () => (
      <TutorialTouchView
        pet={tutorialPet}
        touchIcon={touchIcon}
        onPetClick={() => moveTo("touched")}
      />
    ),
    touched: () => renderDialogue("touched"),
  };

  return renderStrategies[step]();
}
