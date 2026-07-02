import type { CSSProperties } from "react";

export const gradients = {
  green: "linear-gradient(180deg, #50DC7C 10%, #5BECB7 99%) padding-box, linear-gradient(0deg, #50DC7C 10%, #5BECB7 99%) border-box",
  blue: "linear-gradient(180deg, #0080F7 47%, #68B6FF 99%) padding-box, linear-gradient(0deg, #0080F7 10%, #68B6FF 99%) border-box",
  lockedBlue: "linear-gradient(180deg, #0080F7 34%, #68B6FF 99%)",
  silver: "linear-gradient(180deg, #D0D0D0 47%, #EBEBEB 99%) padding-box, linear-gradient(0deg, #D0D0D0 10%, #EBEBEB 99%) border-box",
  white: "linear-gradient(180deg, #E9E9E9 47%, #FFFFFF 99%)",
  lightGreen: "linear-gradient(180deg, rgba(80, 220, 124, 0.4) 10%, rgba(91, 236, 183, 0.4) 99%)",
} satisfies Record<string, CSSProperties["background"]>;
