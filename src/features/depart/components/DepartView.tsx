import Image from "next/image";
import type { ReactNode } from "react";
import { shadows } from "@/components/layout/shadowLayout";
import { GetItemBubble } from "@/components/ui/bubble/GetItemBubble";
import { PetStageAnimation } from "@/components/ui/pet/PetStageAnimation";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";
import type { LatestPetSouvenir } from "@/features/depart/api/GetLatestPetSouvenir";
import { colorCodeToHueRotate } from "@/utils/colorCodeToHueRotate";

export type DepartStep = "Convey" | "Message" | "LastSouvenir" | "NextSetup";

type DepartViewProps = {
  isSubmitting: boolean;
  latestSouvenir: LatestPetSouvenir;
  name: string;
  onNext: () => void;
  petColor: string;
  petCurrentStageKey: string;
  step: DepartStep;
  submitError?: string;
};

type ScreenProps = {
  onNext: () => void;
};

type DepartScreenProps = {
  background: "home" | "setting";
  children: ReactNode;
};

function DepartScreen({ background, children }: DepartScreenProps) {
  const backgroundClassName =
    background === "home"
      ? "bg-[url('/images/home/background.png')] bg-center"
      : "bg-[url('/images/background.png')] bg-[position:center_top] bg-no-repeat";

  return (
    <main
      className={`mobile-screen relative overflow-hidden bg-cover ${backgroundClassName}`}
    >
      {children}
    </main>
  );
}

type DepartPetVisualProps = {
  color: string;
  currentStageKey: string;
  name: string;
};

function DepartPetVisual({
  color,
  currentStageKey,
  name,
}: DepartPetVisualProps) {
  return (
    <div className="relative h-40 w-40 drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]">
      <PetStageAnimation
        aria-label={name}
        className="absolute inset-0 h-full w-full"
        hueRotate={colorCodeToHueRotate(color)}
        stageKey={currentStageKey}
        variant="idle"
      />
    </div>
  );
}

function Convey({
  name,
  onNext,
  petColor,
  petCurrentStageKey,
}: ScreenProps & {
  name: string;
  petColor: string;
  petCurrentStageKey: string;
}) {
  return (
    <DepartScreen background="home">
      <div className="relative min-h-[100dvh]">
        <button
          aria-label="つぎのメッセージへ"
          className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
          onClick={onNext}
          type="button"
        />
        <Image
          src="/images/home/effect.png"
          alt=""
          width={1125}
          height={1143}
          className="mobile-safe-bottom-0 pointer-events-none fixed left-0 max-w-fit"
        />
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <DepartPetVisual
            color={petColor}
            currentStageKey={petCurrentStageKey}
            name={name}
          />
        </div>
        <TopMessagePanel className="relative z-20 pointer-events-none">
          {name}は、あなたに
          <br />
          伝えたいことがあるようです
        </TopMessagePanel>
      </div>
    </DepartScreen>
  );
}

function Message({
  name,
  onNext,
  petColor,
  petCurrentStageKey,
}: ScreenProps & {
  name: string;
  petColor: string;
  petCurrentStageKey: string;
}) {
  return (
    <DepartScreen background="setting">
      <button
        aria-label="旅立ちの案内へ進む"
        className="flex min-h-dvh w-full cursor-pointer flex-col items-center justify-center px-8 text-center"
        onClick={onNext}
        type="button"
      >
        <DepartPetVisual
          color={petColor}
          currentStageKey={petCurrentStageKey}
          name={name}
        />
        <p
          className="text-lg text-teal-500 leading-6"
          style={{ textShadow: shadows.blackSoft }}
        >
          しあわせに なるYO...
        </p>
      </button>
    </DepartScreen>
  );
}

function LastSouvenir({
  onNext,
  souvenir,
}: ScreenProps & { souvenir: LatestPetSouvenir }) {
  return (
    <DepartScreen background="setting">
      <button
        aria-label="旅立ちの案内へ進む"
        className="flex min-h-[100dvh] w-full items-center justify-center border-0 bg-transparent p-0"
        onClick={onNext}
        type="button"
      >
        <GetItemBubble
          className="w-[min(100%,25.5rem)]"
          souvenirs={[
            {
              image: souvenir.imageURL || "/images/souvenir/secret.png",
              name: souvenir.displayName,
            },
          ]}
          text="最後のおみやげ"
        />
      </button>
    </DepartScreen>
  );
}

function NextSetup({
  isSubmitting,
  onNext,
  submitError,
}: ScreenProps & { isSubmitting: boolean; submitError?: string }) {
  return (
    <DepartScreen background="setting">
      <div className="relative min-h-[100dvh]">
        <button
          aria-label="セットアップへ進む"
          className="mobile-safe-bottom-0 absolute left-1/2 cursor-pointer border-0 bg-transparent p-0 -translate-x-1/2"
          disabled={isSubmitting}
          onClick={onNext}
          type="button"
        >
          <Image
            src="/images/depart/bye.png"
            alt="旅立つYO-YO"
            width={141}
            height={171}
            className="h-auto w-[8.8125rem]"
          />
        </button>
        {isSubmitting ? (
          <p className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center text-sm text-teal-700">
            旅立ちを見送っています...
          </p>
        ) : null}
        {submitError ? (
          <p
            aria-live="polite"
            className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 px-6 text-center text-sm text-red-600"
          >
            {submitError}
          </p>
        ) : null}
      </div>
    </DepartScreen>
  );
}

export function DepartView({
  isSubmitting,
  latestSouvenir,
  name,
  onNext,
  petColor,
  petCurrentStageKey,
  step,
  submitError,
}: DepartViewProps) {
  switch (step) {
    case "Convey":
      return (
        <Convey
          name={name}
          onNext={onNext}
          petColor={petColor}
          petCurrentStageKey={petCurrentStageKey}
        />
      );
    case "Message":
      return (
        <Message
          name={name}
          onNext={onNext}
          petColor={petColor}
          petCurrentStageKey={petCurrentStageKey}
        />
      );
    case "LastSouvenir":
      return <LastSouvenir onNext={onNext} souvenir={latestSouvenir} />;
    case "NextSetup":
      return (
        <NextSetup
          isSubmitting={isSubmitting}
          onNext={onNext}
          submitError={submitError}
        />
      );
  }
}
