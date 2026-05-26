"use client";

import { useEffect, useRef } from "react";

export function PixiStage() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let cleanup = () => {};

    async function mountPixi() {
      const { Application, Graphics } = await import("pixi.js");

      if (!isMounted || !hostRef.current) {
        return;
      }

      const app = new Application();
      await app.init({
        antialias: true,
        background: "#111827",
        resizeTo: hostRef.current,
      });

      if (!isMounted || !hostRef.current) {
        app.destroy(true);
        return;
      }

      hostRef.current.appendChild(app.canvas);

      const orb = new Graphics().circle(0, 0, 42).fill(0x38bdf8);
      orb.x = app.screen.width / 2;
      orb.y = app.screen.height / 2;
      app.stage.addChild(orb);

      app.ticker.add(() => {
        orb.rotation += 0.02;
        orb.scale.set(1 + Math.sin(app.ticker.lastTime / 350) * 0.12);
        orb.x = app.screen.width / 2;
        orb.y = app.screen.height / 2;
      });

      cleanup = () => {
        app.destroy(true, { children: true });
      };
    }

    void mountPixi();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="h-[320px] w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950"
      aria-label="Pixi.js demo canvas"
    />
  );
}
