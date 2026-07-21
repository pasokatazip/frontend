import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetFourLegs",
  frameCount: 12,
});

export type SpoiledPetFourLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetFourLegsAnimation(props: SpoiledPetFourLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetFourLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
