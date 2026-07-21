"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

const petAnimationFps = 5;
const pixiDefaultFps = 60;

export type PetFrameAnimationProps = HTMLAttributes<HTMLDivElement> & {
  ariaLabel?: string;
  frameUrls: string[];
  hueRotate?: number;
  loop?: boolean;
};

export function PetFrameAnimation({
  ariaLabel = "ペット",
  className,
  frameUrls,
  hueRotate = 212,
  loop = true,
  ...props
}: PetFrameAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializationQueueRef = useRef<Promise<void>>(Promise.resolve());
  const firstFrameUrl = frameUrls[0];

  useEffect(() => {
    const animationContainer = containerRef.current;
    const canvas = canvasRef.current;

    if (!animationContainer || !canvas || frameUrls.length === 0) {
      return;
    }

    const container = animationContainer;
    const outputCanvas = canvas;
    let cancelled = false;
    let destroyApplication: (() => void) | undefined;

    async function initializeAnimation(
      container: HTMLDivElement,
      outputCanvas: HTMLCanvasElement,
    ) {
      const {
        AccessibilitySystem,
        AnimatedSprite,
        Application,
        Assets,
        extensions,
      } = await import("pixi.js");

      if (cancelled) {
        return;
      }

      // React管理外のDOMを生成するため無効化
      extensions.remove(AccessibilitySystem);

      const app = new Application();
      const texturePromise = Promise.all(
        frameUrls.map((url) => Assets.load(url)),
      );

      const [, textures] = await Promise.all([
        app.init({
          antialias: true,
          autoStart: false,
          autoDensity: true,
          backgroundAlpha: 0,
          canvas: outputCanvas,
          height: Math.max(container.clientHeight, 1),
          resolution: Math.min(window.devicePixelRatio, 2),
          width: Math.max(container.clientWidth, 1),
        }),
        texturePromise,
      ]);

      if (cancelled) {
        app.destroy(false);
        return;
      }

      const sprite = new AnimatedSprite(textures);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      let hasCompleted = false;

      sprite.anchor.set(0.5);
      // Pixiの基準60fpsに対する比率で、1秒5コマの進行速度に合わせる
      sprite.animationSpeed = petAnimationFps / pixiDefaultFps;
      sprite.loop = loop;
      sprite.onComplete = () => {
        hasCompleted = true;
        app.stop();
      };
      app.ticker.maxFPS = petAnimationFps;
      app.stage.addChild(sprite);

      function resizeSprite() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) {
          return;
        }

        app.renderer.resize(width, height);
        const size = Math.min(width, height);

        sprite.position.set(width / 2, height / 2);
        sprite.width = size;
        sprite.height = size;
      }

      function updateMotion() {
        if (reducedMotion.matches) {
          hasCompleted = false;
          sprite.gotoAndStop(0);
          return;
        }

        if (!hasCompleted) {
          sprite.play();
        }
      }

      function updateVisibility() {
        if (document.hidden) {
          app.stop();
          return;
        }

        if (!hasCompleted) {
          app.start();
        }
      }

      const resizeObserver = new ResizeObserver(resizeSprite);

      resizeObserver.observe(container);
      reducedMotion.addEventListener("change", updateMotion);
      document.addEventListener("visibilitychange", updateVisibility);
      resizeSprite();
      updateMotion();
      updateVisibility();

      destroyApplication = () => {
        app.stop();
        resizeObserver.disconnect();
        reducedMotion.removeEventListener("change", updateMotion);
        document.removeEventListener("visibilitychange", updateVisibility);
        // canvasはReact、textureはAssetsキャッシュが所有するためPixiでは破棄しない
        app.destroy(false, {
          children: true,
          texture: false,
          textureSource: false,
        });
      };
    }

    // 前回の非同期初期化と破棄が完了してから、同じcanvasを再利用する
    const previousInitialization = initializationQueueRef.current;

    async function queueInitialization() {
      await previousInitialization.catch(() => null);

      if (!cancelled) {
        await initializeAnimation(container, outputCanvas);
      }
    }

    const initialization = queueInitialization();

    initializationQueueRef.current = initialization;
    void initialization.catch(() => null);

    return () => {
      cancelled = true;
      destroyApplication?.();
    };
  }, [frameUrls, loop]);

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
          className="absolute inset-0 h-full w-full object-contain"
          style={{ filter: `hue-rotate(${hueRotate}deg)` }}
        />
      ) : null}
      <canvas
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
        ref={canvasRef}
        style={{ filter: `hue-rotate(${hueRotate}deg)` }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
