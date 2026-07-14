import { GrowCompleteView } from "./GrowCompleteView";

export function GrowCompleteContainer() {
  return (
    <GrowCompleteView
      dialogue={{
        message: "ナイスYO-YO！",
        speaker: "Dr.YOはかせ",
      }}
      doctorImage={{
        alt: "Dr.YOはかせ",
        height: 512,
        src: "/images/subscription/doctor.png",
        width: 512,
      }}
      growthMessage="《ペットの名前》が成長した！"
    />
  );
}
