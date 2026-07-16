"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";

export type PetFrameAnimationProps = HTMLAttributes<HTMLDivElement> & {
  ariaLabel?: string;
  frameUrls: string[];
  hueRotate?: number;
};

export function PetFrameAnimation({
  ariaLabel = "ペット",
  className,
  frameUrls,
  hueRotate = 212,
  ...props
}: PetFrameAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hueRotateRef = useRef(hueRotate);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const firstFrameUrl = frameUrls[0];

  hueRotateRef.current = hueRotate;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.filter = `hue-rotate(${hueRotate}deg)`;
    }
  }, [hueRotate]);

  useEffect(() => {
    const animationContainer = containerRef.current;

    if (!animationContainer) {
      return;
    }

    let cancelled = false;
    let destroyApplication: (() => void) | undefined;
    setIsAnimationReady(false);

    async function initializeAnimation(container: HTMLDivElement) {
      const { AnimatedSprite, Application, Assets } = await import("pixi.js");
      const app = new Application();
      const texturePromise = Promise.all(
        frameUrls.map((url) => Assets.load(url)),
      );

      const [, textures] = await Promise.all([
        app.init({
          antialias: true,
          autoDensity: true,
          backgroundAlpha: 0,
          resizeTo: container,
          resolution: Math.min(window.devicePixelRatio, 2),
        }),
        texturePromise,
      ]);

      if (cancelled) {
        app.destroy(true);
        return;
      }

      app.canvas.className = "absolute inset-0 block h-full w-full";
      app.canvas.style.filter = `hue-rotate(${hueRotateRef.current}deg)`;
      app.canvas.setAttribute("aria-label", ariaLabel);
      app.canvas.setAttribute("role", "img");
      canvasRef.current = app.canvas;
      container.appendChild(app.canvas);

      const sprite = new AnimatedSprite(textures);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      sprite.anchor.set(0.5);
      sprite.animationSpeed = 1 / 14;
      app.stage.addChild(sprite);

      function resizeSprite() {
        app.resize();
        const size = Math.min(app.screen.width, app.screen.height);

        sprite.position.set(app.screen.width / 2, app.screen.height / 2);
        sprite.width = size;
        sprite.height = size;
      }

      function updateMotion() {
        if (reducedMotion.matches) {
          sprite.gotoAndStop(0);
        } else {
          sprite.play();
        }
      }

      const resizeObserver = new ResizeObserver(resizeSprite);

      resizeObserver.observe(container);
      reducedMotion.addEventListener("change", updateMotion);
      resizeSprite();
      updateMotion();
      setIsAnimationReady(true);

      destroyApplication = () => {
        resizeObserver.disconnect();
        reducedMotion.removeEventListener("change", updateMotion);
        canvasRef.current = null;
        app.destroy(true, {
          children: true,
          texture: false,
          textureSource: false,
        });
      };
    }

    void initializeAnimation(animationContainer);

    return () => {
      cancelled = true;
      destroyApplication?.();
    };
  }, [ariaLabel, frameUrls]);

  return (
    <div
      className={clsx("relative aspect-square", className)}
      ref={containerRef}
      {...props}
    >
      {firstFrameUrl ? (
        <Image
          src={firstFrameUrl}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="8.75rem"
          unoptimized
          className={clsx(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-150",
            isAnimationReady ? "opacity-0" : "opacity-100",
          )}
          style={{ filter: `hue-rotate(${hueRotate}deg)` }}
        />
      ) : null}
    </div>
  );
}
