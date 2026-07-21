import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "../../PetFrameAnimation";

const frameUrls = getPetFrameUrls({
  folderName: "BrattyPetYoFourLegs",
  frameCount: 4,
});

export type BrattyPetYoFourLegsAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls" | "loop"
>;

export function BrattyPetYoFourLegsAnimation(props: BrattyPetYoFourLegsAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="BrattyPetYoFourLegs"
      frameUrls={frameUrls}
      loop={false}
      {...props}
    />
  );
}
