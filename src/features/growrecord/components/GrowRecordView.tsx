"use client";

import { useState } from "react";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { SilverButton } from "@/components/ui/button/SilverButton";
import { DateSelector } from "@/features/report/components/DateSelector";
import { GetMyPet } from "@/components/ui/pet/GetMyPet";
import Image from "next/image";
import Link from "next/link";
import { GrowWay, type GrowStage } from "./GrowWay";
import type { PetSnapshot } from "@/types/pet";
import type { Souvenir } from "@/types/souvenir";
import { GrowRecordRewardModal } from "./GrowRecordRewardModal";

type GrowRecordViewProps = {
  GrowRecordInfo: {
    period: string;
    petName: string;
    stages: GrowStage[];
    prevPet: () => void;
    nextPet: () => void;
  };
  currentPet: PetSnapshot;
  petId: string;
  petName: string;
  color?: string;
  lastSouvenir: {
    id: string;
    unlocked: boolean;
    image: string;
    alt: string;
    width: number;
    height: number;
  } | null;
};

export function GrowRecordView({
  GrowRecordInfo,
  currentPet,
  petId,
  petName,
  color,
  lastSouvenir,
}: GrowRecordViewProps) {
  const [openRewardModal, setOpenRewardModal] = useState(false);

  const souvenirs: Souvenir[] = lastSouvenir
    ? [
        {
          id: lastSouvenir.id,
          name: lastSouvenir.alt,
          image: lastSouvenir.image,
        },
      ]
    : [];

  return (
    <>
      <main className="mobile-screen bg-[url('/images/Report/background.png')] bg-cover bg-center p-4">
        <div className="flex flex-col gap-3.5">
          <SilverButton className="max-h-10 max-w-[70%] flex text-[16px]">
            <p className="bg-white h-8 py-1 rounded-full w-full flex items-center justify-center">
              {GrowRecordInfo.period}
            </p>
          </SilverButton>

          <DateSelector
            text={GrowRecordInfo.petName}
            onPrev={GrowRecordInfo.prevPet}
            onNext={GrowRecordInfo.nextPet}
          />
        </div>

        <div className="relative h-100 p-10 flex justify-center items-center">
          <GetMyPet pet={currentPet} size="lg" />

          <button
            type="button"
            className="absolute right-0 bottom-0"
            onClick={() => setOpenRewardModal(true)}
            disabled={!lastSouvenir}
            aria-label="最後のおみやげを見る"
          >
            <div className="relative">
              <Image
                src="/images/getBubble.png"
                alt=""
                className="self-start min-w-15 min-h-15 drop-shadow-[0_0_4px_#009C57]"
                width={60}
                height={60}
              />

              <Image
                src={lastSouvenir?.image ?? "/images/souvenir/secret.png"}
                alt={lastSouvenir?.alt ?? "おみやげ未取得"}
                className="absolute top-0 left-0 min-w-15 min-h-15"
                width={60}
                height={60}
                unoptimized
              />
            </div>
          </button>
        </div>

        <GrowWay
          stages={GrowRecordInfo.stages}
          petId={petId}
          petName={petName}
          color={color}
        />

        <GrowRecordRewardModal
          open={openRewardModal}
          onClose={() => setOpenRewardModal(false)}
          souvenirs={souvenirs}
        />
      </main>

      <footer className="fixed bottom-3 flex min-w-full gap-20 px-4">
        <Link href="/Home">
          <RoundButton image="/icons/home.svg" label="ホームへ" />
        </Link>

        <Link href="/Report" className="w-full">
          <GreenButton className="rounded-xl rounded-br-none max-h-15">
            レポート
          </GreenButton>
        </Link>
      </footer>
    </>
  );
}
