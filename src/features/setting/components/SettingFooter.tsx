import Image from "next/image";
import { RoundButton } from "@/components/ui/button/RoundButton";
import Link from "next/link";

type SettingFooterProps = {
  petImage: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
};

export function SettingFooter({ petImage }: SettingFooterProps) {
  return (
    <div className="mt-auto flex items-end justify-between pb-1">
      <Link href="/Home">
        <RoundButton image="/icons/home.svg" label="ホームへ" />
      </Link>
      <Image
        src={petImage.src}
        alt={petImage.alt}
        width={petImage.width}
        height={petImage.height}
        priority
        className="h-[7.5rem] w-[8.5rem] object-contain"
      />
    </div>
  );
}
