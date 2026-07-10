"use client";

import { GrowRecordView } from "./GrowRecordView";

export function GrowRecordContainer() {
  const period = `2026/01/22 - 2026/05/22`;
  // APIから取得したら{ペット名}差し替える
  const petName = `ペット名`;

  const prevPet = () => {};

  const nextPet = () => {};

  const stages = [
    {
      stage: "あかご期",
      unlocked: true,
      image: "/images/home/pet1.png",
    },
    {
      stage: "あまえ期",
      unlocked: true,
      image: "/images/home/pet1.png",
    },
    {
      stage: "なまい期",
      unlocked: false,
      image: "/images/home/pet3.png",
    },
  ];

  return (
    <GrowRecordView
      GrowRecordInfo={{
        period,
        petName,
        prevPet,
        nextPet,
        stages,
      }}
      petImage={{
        src: "/images/home/pet1.png",
        alt: "ペット",
        height: 120,
        width: 120,
      }}
    />
  );
}
