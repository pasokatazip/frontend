import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BabyPetYo",
  frameCount: 4,
});

export type BabyPetYoAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BabyPetYoAnimation(props: BabyPetYoAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BabyPetYo"
      frameUrls={frameUrls}
      loop={false}
      {...props}
    />
  );
}
