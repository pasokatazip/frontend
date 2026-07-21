import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "SpoiledPetWalkFourLegs",
  frameCount: 4,
});

export type SpoiledPetWalkFourLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function SpoiledPetWalkFourLegsAnimation(props: SpoiledPetWalkFourLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="SpoiledPetWalkFourLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
