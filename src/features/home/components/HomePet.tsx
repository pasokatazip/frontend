import { clsx } from "clsx";
import { PetStageAnimation } from "@/components/ui/pet/PetStageAnimation";
import type { Ref } from "react";

export type HomePetProps = {
  animationKey?: number;
  className?: string;
  elementRef?: Ref<HTMLButtonElement>;
  facing?: 1 | -1;
  hueRotate: number;
  layout?: "field" | "group";
  name: string;
  onWalkStart?: () => void;
  onYo?: () => void;
  stageKey: string;
  variant?: "walk" | "yo";
  x?: number;
  y?: number;
};

export function HomePet({
  animationKey = 0,
  className,
  elementRef,
  facing = 1,
  hueRotate,
  layout = "field",
  name,
  onWalkStart,
  onYo,
  stageKey,
  variant = "walk",
  x,
  y,
}: HomePetProps) {
  const hasPosition = x !== undefined && y !== undefined;
  const isVisible = hasPosition;

  return (
    <button
      aria-label={`${name}にYOしてもらう`}
      className={clsx(
        "pointer-events-auto appearance-none border-0 bg-transparent p-0 transition-[transform,opacity] duration-100 ease-linear will-change-transform",
        layout === "field"
          ? "absolute top-0 left-0 h-[8.75rem] w-[10rem]"
          : "h-28 w-32",
        className,
      )}
      onClick={onYo}
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: hasPosition ? `translate3d(${x}px, ${y}px, 0)` : undefined,
      }}
      type="button"
    >
      <div
        className="relative h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]"
        style={{ transform: `scaleX(${facing})` }}
      >
        <PetStageAnimation
          key={animationKey}
          aria-hidden="true"
          hueRotate={hueRotate}
          className="absolute inset-0 h-full w-full"
          onIntroComplete={onWalkStart}
          stageKey={stageKey}
          variant={variant === "yo" ? "yoWalk" : "walk"}
        />
      </div>
    </button>
  );
}
