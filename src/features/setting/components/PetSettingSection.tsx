import Image from "next/image";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { GlassCard } from "@/components/ui/card/GlassCard";
import { TextInput } from "@/components/ui/input/TextInput";
import { PetLockedOverlay } from "@/features/setting/components/PetLockedOverlay";

type PetSettingSectionProps = {
  petImage: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function PetSettingSection({ petImage }: PetSettingSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]">
        ペット設定
      </h2>

      <GlassCard className="relative mt-3 grid min-h-[11.5rem] grid-cols-[7rem_1fr] items-center gap-3 overflow-hidden px-4 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-5 sm:px-8 sm:py-7">
        <Image
          src={petImage.src}
          alt={petImage.alt}
          width={petImage.width}
          height={petImage.height}
          priority
          className="h-[7.5rem] w-[8.5rem] object-contain sm:h-[8.75rem] sm:w-[9.75rem]"
        />

        <div>
          <label
            className="mb-2 block text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
            htmlFor="pet-name"
          >
            名前
          </label>
          <TextInput
            id="pet-name"
            aria-label="ペット名"
            defaultValue="ペット名"
            className="h-14 rounded-[12px] px-5 text-lg sm:h-[4.5rem] sm:px-7 sm:text-xl"
          />
          <BlueButton
            className="mt-4 max-w-[7.5rem] gap-1.5 rounded-[12px] text-sm sm:mt-5 sm:max-w-[8.75rem] sm:text-base"
            style={{ height: "2.25rem" }}
          >
            <Image
              src="/icons/color.svg"
              alt=""
              width={32}
              height={32}
              className="h-5 w-5 brightness-0 invert"
            />
            色変更
          </BlueButton>
        </div>
        <PetLockedOverlay />
      </GlassCard>
    </section>
  );
}
