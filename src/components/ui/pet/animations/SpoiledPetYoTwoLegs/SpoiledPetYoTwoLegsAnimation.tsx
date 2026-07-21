import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetYoTwoLegs",
  frameCount: 4,
});

export type SpoiledPetYoTwoLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetYoTwoLegsAnimation(props: SpoiledPetYoTwoLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetYoTwoLegs"
      frameUrls={frameUrls}
      loop={false}
      {...props}
    />
  );
}
