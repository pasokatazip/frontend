import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetTentacle",
  frameCount: 12,
});

export type SpoiledPetTentacleAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetTentacleAnimation(props: SpoiledPetTentacleAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetTentacle"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
