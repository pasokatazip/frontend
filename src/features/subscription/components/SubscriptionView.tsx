import Image from "next/image";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { SubscriptionBenefitCard } from "@/features/subscription/components/SubscriptionBenefitCard";
import { SubscriptionFooterVisual } from "@/features/subscription/components/SubscriptionFooterVisual";

export type ImageAsset = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

type SubscriptionViewProps = {
  doctorImage: ImageAsset;
  petImage: ImageAsset;
  superYoYoImage: ImageAsset;
};

export function SubscriptionView({
  doctorImage,
  petImage,
  superYoYoImage,
}: SubscriptionViewProps) {
  return (
    <main className="mobile-safe-screen relative overflow-hidden px-[clamp(1rem,5vw,1.5rem)]">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-[position:center_top] bg-no-repeat"
      />
      <div className="mobile-safe-content relative mx-auto flex w-full max-w-[min(100%,27rem)] flex-col">
        <header className="flex items-center gap-[clamp(1rem,4vw,1.25rem)]">
          <Image
            src="/icons/lock.svg"
            alt=""
            width={32}
            height={32}
            className="h-[clamp(1.75rem,8vw,2rem)] w-[clamp(1.75rem,8vw,2rem)] brightness-0 opacity-65"
          />
          <h1 className="text-[clamp(1.125rem,5vw,1.25rem)] leading-7 font-normal tracking-normal text-[#4C4F5E]">
            超-YO-YO！
          </h1>
        </header>

        <SubscriptionBenefitCard superYoYoImage={superYoYoImage} />

        <BlueButton
          className="mx-auto mt-5 max-w-[min(100%,21rem)] text-sm"
          style={{ height: "3.25rem" }}
        >
          超-YO-YO！して機能を解放する　¥700
        </BlueButton>

        <SubscriptionFooterVisual
          doctorImage={doctorImage}
          petImage={petImage}
        />
      </div>
    </main>
  );
}
