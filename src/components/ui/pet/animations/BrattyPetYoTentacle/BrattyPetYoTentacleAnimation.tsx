import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetYoTentacle",
  frameCount: 4,
});

export type BrattyPetYoTentacleAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetYoTentacleAnimation(props: BrattyPetYoTentacleAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetYoTentacle"
      frameUrls={frameUrls}
      loop={false}
      {...props}
    />
  );
}
