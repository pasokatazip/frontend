import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetWalkTwoLegs",
  frameCount: 4,
});

export type BrattyPetWalkTwoLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetWalkTwoLegsAnimation(props: BrattyPetWalkTwoLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetWalkTwoLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
