import type { CSSProperties } from "react";

export const shadows = {
  green: "0 0 5px #009C57, inset 0 4px 10px #B8FFDF",
  blue: "0 0 5px #0041FF, inset 0 4px 10px #98D9FF",
  silver: "0 0 5px #5BD4EC, inset 0 4px 10px #FFFFFF",
} satisfies Record<string, CSSProperties["boxShadow"]>;
