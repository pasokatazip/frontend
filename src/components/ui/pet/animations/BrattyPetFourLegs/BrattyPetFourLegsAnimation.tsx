import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetFourLegs",
  frameCount: 12,
});

export type BrattyPetFourLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetFourLegsAnimation(props: BrattyPetFourLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetFourLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
