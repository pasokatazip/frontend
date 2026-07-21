import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetTwoLegs",
  frameCount: 12,
});

export type BrattyPetTwoLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetTwoLegsAnimation(props: BrattyPetTwoLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetTwoLegs"
      frameUrls={frameUrls}
      loop={true}
      {...props}
    />
  );
}
