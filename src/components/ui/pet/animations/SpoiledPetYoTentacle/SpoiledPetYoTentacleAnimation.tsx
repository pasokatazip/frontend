import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetYoTentacle",
  frameCount: 4,
});

export type SpoiledPetYoTentacleAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetYoTentacleAnimation(props: SpoiledPetYoTentacleAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetYoTentacle"
      frameUrls={frameUrls}
      loop={false}
      {...props}
    />
  );
}
