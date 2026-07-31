import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetWalkTwoLegs",
  frameCount: 4,
});

export type SpoiledPetWalkTwoLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetWalkTwoLegsAnimation(props: SpoiledPetWalkTwoLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetWalkTwoLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
