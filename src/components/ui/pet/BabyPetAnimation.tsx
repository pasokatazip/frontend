"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";
import babyPet1 from "@public/images/babypet/babypet1.png";
import babyPet10 from "@public/images/babypet/babypet10.png";
import babyPet11 from "@public/images/babypet/babypet11.png";
import babyPet12 from "@public/images/babypet/babypet12.png";
import babyPet2 from "@public/images/babypet/babypet2.png";
import babyPet3 from "@public/images/babypet/babypet3.png";
import babyPet4 from "@public/images/babypet/babypet4.png";
import babyPet5 from "@public/images/babypet/babypet5.png";
import babyPet6 from "@public/images/babypet/babypet6.png";
import babyPet7 from "@public/images/babypet/babypet7.png";
import babyPet8 from "@public/images/babypet/babypet8.png";
import babyPet9 from "@public/images/babypet/babypet9.png";

const babyPetFrameUrls = [
  babyPet1.src,
  babyPet2.src,
  babyPet3.src,
  babyPet4.src,
  babyPet5.src,
  babyPet6.src,
  babyPet7.src,
  babyPet8.src,
  babyPet9.src,
  babyPet10.src,
  babyPet11.src,
  babyPet12.src,
];

type BabyPetAnimationProps = HTMLAttributes<HTMLDivElement> & {
  hueRotate?: number;
};

export function BabyPetAnimation({
  className,
  hueRotate = 212,
  ...props
}: BabyPetAnimationProps) {
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
      app.canvas.setAttribute("aria-label", "ベビーペット");
      app.canvas.setAttribute("role", "img");
      container.appendChild(app.canvas);

      const textures = await Promise.all(
        babyPetFrameUrls.map((url) => Assets.load(url)),
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
  }, [hueRotate]);

  return (
    <div
      className={clsx("relative aspect-square", className)}
      ref={containerRef}
      {...props}
    />
  );
}
