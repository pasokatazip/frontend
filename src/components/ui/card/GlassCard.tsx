import { clsx } from "clsx";
import type { CSSProperties, HTMLAttributes } from "react";
import { shadows } from "@/components/layout/shadowLayout";

const glassCardStyle = {
  boxShadow: shadows.silver,
} satisfies CSSProperties;

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className, style, ...props }: GlassCardProps) {
  return (
    <div
      className={clsx("rounded-xl bg-white/45 backdrop-blur-md", className)}
      style={{ ...glassCardStyle, ...style }}
      {...props}
    />
  );
}
