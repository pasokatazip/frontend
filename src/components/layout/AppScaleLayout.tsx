"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

const DESIGN_HEIGHT = 932;
const DESIGN_WIDTH = 430;

type AppScaleLayoutProps = {
  children: ReactNode;
};

function getScaleDisplayOptions() {
  const iosNavigator = navigator as Navigator & { standalone?: boolean };
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    iosNavigator.standalone === true;
  const isDesktop = window.matchMedia(
    "(min-width: 48rem) and (pointer: fine)",
  ).matches;

  if (!isStandalone && !isDesktop) {
    return null;
  }

  return {
    ignoreHeightOnlyResize: isStandalone && !isDesktop,
  };
}

function readSafeAreaInsets() {
  const probe = document.createElement("div");

  Object.assign(probe.style, {
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
    paddingTop: "env(safe-area-inset-top, 0px)",
    pointerEvents: "none",
    position: "fixed",
    visibility: "hidden",
  });
  document.body.append(probe);

  const styles = window.getComputedStyle(probe);
  const safeArea = {
    bottom: Number.parseFloat(styles.paddingBottom) || 0,
    top: Number.parseFloat(styles.paddingTop) || 0,
  };

  probe.remove();
  return safeArea;
}

export function AppScaleLayout({ children }: AppScaleLayoutProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    const displayOptions = getScaleDisplayOptions();

    if (!canvas || !viewport || !displayOptions) {
      return;
    }

    const scaleDisplayOptions = displayOptions;
    const scaleCanvas = canvas;
    const bodyStyles = {
      height: document.body.style.height,
      inset: document.body.style.inset,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
    };
    let viewportHeight = 0;
    let viewportWidth = 0;

    viewport.dataset.active = "true";
    Object.assign(document.body.style, {
      height: "100dvh",
      inset: "0",
      overflow: "hidden",
      position: "fixed",
      width: "100%",
    });

    function updateScale(force = false) {
      const nextWidth = document.documentElement.clientWidth;
      const nextHeight = window.innerHeight;

      if (
        !force &&
        Math.abs(nextWidth - viewportWidth) < 2 &&
        (scaleDisplayOptions.ignoreHeightOnlyResize ||
          Math.abs(nextHeight - viewportHeight) < 2)
      ) {
        return;
      }

      viewportWidth = nextWidth;
      viewportHeight = nextHeight;
      const scale = Math.min(
        1,
        viewportWidth / DESIGN_WIDTH,
        viewportHeight / DESIGN_HEIGHT,
      );
      const safeArea = readSafeAreaInsets();

      scaleCanvas.style.setProperty("--pwa-scale", String(scale));
      scaleCanvas.style.setProperty(
        "--pwa-canvas-width",
        `${viewportWidth / scale}px`,
      );
      scaleCanvas.style.setProperty(
        "--pwa-canvas-height",
        `${viewportHeight / scale}px`,
      );
      scaleCanvas.style.setProperty(
        "--safe-area-top",
        `${safeArea.top / scale}px`,
      );
      scaleCanvas.style.setProperty(
        "--safe-area-bottom",
        `${safeArea.bottom / scale}px`,
      );
      scaleCanvas.dataset.ready = "true";
    }

    function handleResize() {
      updateScale();
    }

    updateScale(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Object.assign(document.body.style, bodyStyles);
    };
  }, []);

  return (
    <div className="app-scale-viewport" ref={viewportRef}>
      <div className="app-scale-canvas" ref={canvasRef}>
        {children}
      </div>
    </div>
  );
}
