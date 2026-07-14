import { GrowView } from "./GrowView";

export function GrowContainer() {
  return (
    <GrowView
      dialogue={{
        message: "おや...《ペットの名前》のようすが...？",
        speaker: "Dr.YOはかせ",
      }}
      doctorImage={{
        alt: "Dr.YOはかせ",
        height: 512,
        src: "/images/subscription/doctor.png",
        width: 512,
      }}
    />
  );
}
