import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetYoTwoLegs",
  frameCount: 4,
});

export type BrattyPetYoTwoLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetYoTwoLegsAnimation(props: BrattyPetYoTwoLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetYoTwoLegs"
      frameUrls={frameUrls}
      loop={false}
      {...props}
    />
  );
}
