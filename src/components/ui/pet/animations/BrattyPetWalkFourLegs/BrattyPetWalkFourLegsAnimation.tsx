import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetWalkFourLegs",
  frameCount: 4,
});

export type BrattyPetWalkFourLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetWalkFourLegsAnimation(props: BrattyPetWalkFourLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetWalkFourLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
