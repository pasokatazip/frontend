import { SubscriptionView } from "./SubscriptionView";

export function SubscriptionContainer() {
  return (
    <SubscriptionView
      doctorImage={{
        alt: "ドクター",
        height: 570,
        src: "/images/subscription/doctor.png",
        width: 468,
      }}
      petImage={{
        alt: "ペット",
        height: 323,
        src: "/images/home/pet.png",
        width: 364,
      }}
      superYoYoImage={{
        alt: "過去レポート全開放",
        height: 780,
        src: "/images/subscription/superyo-yo.png",
        width: 840,
      }}
    />
  );
}
