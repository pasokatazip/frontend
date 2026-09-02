"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingDotAnimation } from "./LoadingDotAnimation";
import { LoadingFrameAnimation } from "./LoadingFrameAnimation";

const FADE_OUT_DURATION_MS = 300;
const MINIMUM_VISIBLE_DURATION_MS = 900;

type LoadingScreenProps = {
  visible: boolean;
};

export function LoadingScreen({ visible }: LoadingScreenProps) {
  const [isRendered, setIsRendered] = useState(visible);
  const [isOpaque, setIsOpaque] = useState(visible);
  const shownAtRef = useRef<number | null>(null);

  useEffect(() => {
    let fadeInFrame: number | undefined;
    let fadeOutTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;

    if (visible) {
      shownAtRef.current = Date.now();
      setIsRendered(true);
      fadeInFrame = window.requestAnimationFrame(() => setIsOpaque(true));
    } else {
      const elapsedTime = shownAtRef.current
        ? Date.now() - shownAtRef.current
        : MINIMUM_VISIBLE_DURATION_MS;
      const remainingTime = Math.max(
        0,
        MINIMUM_VISIBLE_DURATION_MS - elapsedTime,
      );

      fadeOutTimer = setTimeout(() => {
        setIsOpaque(false);
        removeTimer = setTimeout(() => {
          setIsRendered(false);
          shownAtRef.current = null;
        }, FADE_OUT_DURATION_MS);
      }, remainingTime);
    }

    return () => {
      if (fadeInFrame !== undefined) {
        window.cancelAnimationFrame(fadeInFrame);
      }
      if (fadeOutTimer !== undefined) {
        clearTimeout(fadeOutTimer);
      }
      if (removeTimer !== undefined) {
        clearTimeout(removeTimer);
      }
    };
  }, [visible]);

  if (!isRendered) {
    return null;
  }

  return (
    <output
      aria-hidden={!isOpaque}
      aria-live="polite"
      aria-label="読み込み中"
      className={`fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#D2ECFF] bg-[url('/images/home/background.png')] bg-cover bg-center transition-opacity duration-300 ease-out motion-reduce:duration-0 ${
        isOpaque ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3 text-center text-[#4C4F5E]">
        <LoadingFrameAnimation />
        <div className="flex h-10 items-center justify-center">
          <p className="text-white text-2xl font-bold leading-8">Nowloading</p>
          <LoadingDotAnimation />
        </div>
      </div>
    </output>
  );
}
