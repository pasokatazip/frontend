"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_FRAME_DURATION_MS = 200;

type FrameSequenceAnimationProps = {
  className?: string;
  frameDurationMs?: number;
  frameUrls: readonly string[];
  sizes: string;
};

export function FrameSequenceAnimation({
  className,
  frameDurationMs = DEFAULT_FRAME_DURATION_MS,
  frameUrls,
  sizes,
}: FrameSequenceAnimationProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationTimer: ReturnType<typeof setInterval> | undefined;

    const stopAnimation = () => {
      if (animationTimer !== undefined) {
        clearInterval(animationTimer);
        animationTimer = undefined;
      }
    };

    const updateAnimation = () => {
      stopAnimation();

      if (document.hidden || reducedMotion.matches || frameUrls.length < 2) {
        setFrameIndex(0);
        return;
      }

      animationTimer = setInterval(() => {
        setFrameIndex((currentFrame) => (currentFrame + 1) % frameUrls.length);
      }, frameDurationMs);
    };

    reducedMotion.addEventListener("change", updateAnimation);
    document.addEventListener("visibilitychange", updateAnimation);
    updateAnimation();

    return () => {
      stopAnimation();
      reducedMotion.removeEventListener("change", updateAnimation);
      document.removeEventListener("visibilitychange", updateAnimation);
    };
  }, [frameDurationMs, frameUrls]);

  return (
    <div aria-hidden="true" className={clsx("relative", className)}>
      {frameUrls.map((frameUrl, index) => (
        <Image
          key={frameUrl}
          src={frameUrl}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes={sizes}
          unoptimized
          className={clsx(
            "absolute inset-0 h-full w-full object-contain",
            index === frameIndex ? "visible" : "invisible",
          )}
        />
      ))}
    </div>
  );
}
