import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import { FrameSequenceAnimation } from "./FrameSequenceAnimation";

const frameUrls = getPetFrameUrls({
  filePrefix: "Loading",
  folderName: "Loadings",
  frameCount: 3,
});

type LoadingFrameAnimationProps = {
  className?: string;
};

export function LoadingFrameAnimation({
  className,
}: LoadingFrameAnimationProps) {
  return (
    <FrameSequenceAnimation
      className={`aspect-[260/133] w-[16.25rem] max-w-[75vw] ${className ?? ""}`}
      frameUrls={frameUrls}
      sizes="260px"
    />
  );
}
