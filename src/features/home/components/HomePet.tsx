import { clsx } from "clsx";
import { PetStageAnimation } from "@/components/ui/pet/PetStageAnimation";
import type { Ref } from "react";

export type HomePetProps = {
  className?: string;
  elementRef?: Ref<HTMLDivElement>;
  facing?: 1 | -1;
  hueRotate: number;
  layout?: "field" | "group";
  name: string;
  onWalkStart?: () => void;
  stageKey: string;
  variant?: "walk" | "yo";
  x?: number;
  y?: number;
};

export function HomePet({
  className,
  elementRef,
  facing = 1,
  hueRotate,
  layout = "field",
  name,
  onWalkStart,
  stageKey,
  variant = "walk",
  x,
  y,
}: HomePetProps) {
  const hasPosition = x !== undefined && y !== undefined;
  const isVisible = hasPosition;

  return (
    <div
      className={clsx(
        "transition-[transform,opacity] duration-100 ease-linear will-change-transform",
        layout === "field"
          ? "absolute top-0 left-0 h-[8.75rem] w-[10rem]"
          : "h-28 w-32",
        className,
      )}
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: hasPosition ? `translate3d(${x}px, ${y}px, 0)` : undefined,
      }}
    >
      <span className="sr-only">{name}</span>
      <div
        className="relative h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]"
        style={{ transform: `scaleX(${facing})` }}
      >
        <PetStageAnimation
          aria-hidden="true"
          hueRotate={hueRotate}
          className="absolute inset-0 h-full w-full"
          onIntroComplete={onWalkStart}
          stageKey={stageKey}
          variant={variant === "yo" ? "yoWalk" : "walk"}
        />
      </div>
    </div>
  );
}
