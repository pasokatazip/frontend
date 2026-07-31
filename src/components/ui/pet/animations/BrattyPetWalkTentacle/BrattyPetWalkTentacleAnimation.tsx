import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetWalkTentacle",
  frameCount: 4,
});

export type BrattyPetWalkTentacleAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetWalkTentacleAnimation(props: BrattyPetWalkTentacleAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetWalkTentacle"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
