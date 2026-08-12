"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

const DESIGN_WIDTH = 430;

type MobileScaleLayoutProps = {
  children: ReactNode;
};

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
  const insets = {
    bottom: Number.parseFloat(styles.paddingBottom) || 0,
    top: Number.parseFloat(styles.paddingTop) || 0,
  };

  probe.remove();
  return insets;
}

export function MobileScaleLayout({ children }: MobileScaleLayoutProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const scaleCanvas = canvas;
    let viewportWidth = 0;

    function updateScale(force = false) {
      const nextWidth = document.documentElement.clientWidth;

      if (!force && Math.abs(nextWidth - viewportWidth) < 2) {
        return;
      }

      viewportWidth = nextWidth;
      const viewportHeight = window.innerHeight;
      const scale = viewportWidth / DESIGN_WIDTH;
      const canvasHeight = viewportHeight / scale;
      const safeArea = readSafeAreaInsets();

      scaleCanvas.style.setProperty("--mobile-scale", String(scale));
      scaleCanvas.style.setProperty(
        "--mobile-canvas-height",
        `${canvasHeight}px`,
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

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mobile-scale-viewport">
      <div className="mobile-scale-canvas" ref={canvasRef}>
        {children}
      </div>
    </div>
  );
}
