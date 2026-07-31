import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { SilverButton } from "@/components/ui/button/SilverButton";
import { DateSelector } from "@/features/report/components/DateSelector";
import Image from "next/image";
import Link from "next/link";
import { GrowWay } from "./GrowWay";

type GrowStage = {
  stage: string;
  unlocked: boolean;
  image: string;
};

type GrowRecordViewProps = {
  GrowRecordInfo: {
    period: string;
    petName: string;
    stages: GrowStage[];

    prevPet: () => void;
    nextPet: () => void;
  };
  petImage: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  lastSouvenir: {
    unlocked: boolean;
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function GrowRecordView({
  GrowRecordInfo,
  petImage,
  lastSouvenir,
}: GrowRecordViewProps) {
  return (
    <>
      <main className="mobile-screen bg-[url('/images/Report/background.png')] bg-cover bg-center min-h-svh p-4">
        <div className="flex flex-col gap-3.5">
          <SilverButton className="max-h-10 max-w-[70%] flex text-[16px]">
            <p className="bg-white py-2 rounded-full w-full">
              {GrowRecordInfo.period}
            </p>
          </SilverButton>
          <DateSelector
            text={GrowRecordInfo.petName}
            onPrev={GrowRecordInfo.prevPet}
            onNext={GrowRecordInfo.nextPet}
          />
        </div>
        <div className="relative p-10">
          <Image
            src={petImage.src}
            alt={petImage.alt}
            width={petImage.width}
            height={petImage.height}
            className="self-start min-w-full"
            priority
          />
          <div className="absolute right-0 bottom-0">
            <div className="relative">
              <Image
                src="/images/getBubble.png"
                alt=""
                className="self-start min-w-15 min-h-15 drop-shadow-[0_0_4px_#009C57]"
                width={60}
                height={60}
              />
              <Image
                src={
                  lastSouvenir.unlocked
                    ? lastSouvenir.src
                    : "/images/souvenir/secret.png"
                }
                alt={lastSouvenir.alt}
                className="absolute top-0 left-0 min-w-15 min-h-15"
                width={lastSouvenir.width}
                height={lastSouvenir.height}
              />{" "}
            </div>
          </div>
        </div>
        <GrowWay stages={GrowRecordInfo.stages} />
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
