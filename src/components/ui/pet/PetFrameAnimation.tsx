"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const animationContainer = containerRef.current;

    if (!animationContainer) {
      return;
    }

    let cancelled = false;
    let destroyApplication: (() => void) | undefined;

    async function initializeAnimation(container: HTMLDivElement) {
      const { AnimatedSprite, Application, Assets } = await import("pixi.js");
      const app = new Application();

      await app.init({
        antialias: true,
        autoDensity: true,
        backgroundAlpha: 0,
        resizeTo: container,
        resolution: Math.min(window.devicePixelRatio, 2),
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      app.canvas.className = "block h-full w-full";
      app.canvas.style.filter = `hue-rotate(${hueRotate}deg)`;
      app.canvas.setAttribute("aria-label", ariaLabel);
      app.canvas.setAttribute("role", "img");
      container.appendChild(app.canvas);

      const textures = await Promise.all(
        frameUrls.map((url) => Assets.load(url)),
      );

      if (cancelled) {
        app.destroy(true);
        return;
      }

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

      destroyApplication = () => {
        resizeObserver.disconnect();
        reducedMotion.removeEventListener("change", updateMotion);
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
  }, [ariaLabel, frameUrls, hueRotate]);

  return (
    <div
      className={clsx("relative aspect-square", className)}
      ref={containerRef}
      {...props}
    />
  );
}
