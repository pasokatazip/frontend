import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BabyPetWalk",
  frameCount: 4,
});

export type BabyPetWalkAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BabyPetWalkAnimation(props: BabyPetWalkAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BabyPetWalk"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
