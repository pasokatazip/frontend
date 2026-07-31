import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetWalkTentacle",
  frameCount: 4,
});

export type SpoiledPetWalkTentacleAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetWalkTentacleAnimation(props: SpoiledPetWalkTentacleAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetWalkTentacle"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
