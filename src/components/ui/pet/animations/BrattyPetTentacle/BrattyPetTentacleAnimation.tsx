import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetTentacle",
  frameCount: 12,
});

export type BrattyPetTentacleAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetTentacleAnimation(props: BrattyPetTentacleAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetTentacle"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
