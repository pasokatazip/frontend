import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BabyPet",
  frameCount: 12,
});

export type BabyPetAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BabyPetAnimation(props: BabyPetAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BabyPet"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
