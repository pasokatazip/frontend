import Image from "next/image";
import { BabyPetWalkAnimation } from "@/components/ui/pet/animations/BabyPetWalk/BabyPetWalkAnimation";
import type { Ref } from "react";

export type HomePetProps = {
  elementRef?: Ref<HTMLDivElement>;
  facing?: 1 | -1;
  hueRotate: number;
  imageUrl: string;
  name: string;
  x?: number;
  y?: number;
};

export function HomePet({
  elementRef,
  facing = 1,
  hueRotate,
  imageUrl,
  name,
  x,
  y,
}: HomePetProps) {
  const hasPosition = x !== undefined && y !== undefined;

  return (
    <div
      className="absolute top-0 left-0 h-[8.75rem] w-[10rem] transition-[transform,opacity] duration-100 ease-linear will-change-transform"
      ref={elementRef}
      style={{
        opacity: hasPosition ? 1 : 0,
        transform: hasPosition ? `translate3d(${x}px, ${y}px, 0)` : undefined,
      }}
    >
      <span className="sr-only">{name}</span>
      <div
        className="relative h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]"
        style={{ transform: `scaleX(${facing})` }}
      >
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          fill
          loading="eager"
          sizes="10rem"
          unoptimized
          className="object-contain"
          style={{ filter: `hue-rotate(${hueRotate}deg)` }}
        />
        <BabyPetWalkAnimation
          aria-hidden="true"
          hueRotate={hueRotate}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
