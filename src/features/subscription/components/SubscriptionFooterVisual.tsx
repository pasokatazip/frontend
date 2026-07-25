import Image from "next/image";
import { RoundButton } from "@/components/ui/button/RoundButton";
import type { ImageAsset } from "@/features/subscription/components/SubscriptionView";
import Link from "next/link";
import { GetMyPet } from "@/components/ui/pet/GetMyPet";
import { PetSnapshot } from "@/types/pet";

type SubscriptionFooterVisualProps = {
  doctorImage: ImageAsset;
  pet: PetSnapshot;
};

export function SubscriptionFooterVisual({
  doctorImage,
  pet,
}: SubscriptionFooterVisualProps) {
  return (
    <div className="relative mt-auto min-h-[clamp(9rem,21dvh,11.5rem)] pb-1">
      <div className="absolute bottom-0 left-0 z-10">
        <Link href="/Home">
          <RoundButton image="/icons/home.svg" label="ホームへ" />
        </Link>
      </div>
      <div className="absolute right-[clamp(-3.25rem,-9vw,-1.75rem)] bottom-[-1.75rem] flex items-end">
        <GetMyPet
          pet={pet}
          size="md"
          className="relative m-10 z-10 -mr-6 h-[clamp(4.5rem,10.5dvh,5.5rem)] w-[clamp(5.125rem,12dvh,6.25rem)] object-contain"
        />

        <Image
          src={doctorImage.src}
          alt={doctorImage.alt}
          width={doctorImage.width}
          height={doctorImage.height}
          priority
          className="relative h-[clamp(10.25rem,24dvh,12.5rem)] w-[clamp(8.5rem,20dvh,10.25rem)] object-contain"
        />
      </div>
    </div>
  );
}
