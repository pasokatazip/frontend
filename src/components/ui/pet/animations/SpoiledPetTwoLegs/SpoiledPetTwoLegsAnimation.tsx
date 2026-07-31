import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetTwoLegs",
  frameCount: 12,
});

export type SpoiledPetTwoLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetTwoLegsAnimation(props: SpoiledPetTwoLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetTwoLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
