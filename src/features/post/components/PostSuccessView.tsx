import Image, { type StaticImageData } from "next/image";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";

type PostSuccessViewProps = {
  onHome: () => void;
  onNext: () => void;
  petImage: StaticImageData;
};

export function PostSuccessView({
  onHome,
  onNext,
  petImage,
}: PostSuccessViewProps) {
  return (
    <main className="mobile-screen relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat"
      />

      <div className="relative mx-auto min-h-[100dvh] w-full max-w-[29rem]">
        <TopMessagePanel>つぶやきました</TopMessagePanel>

        <button
          aria-label="つぎへ進む"
          className="absolute top-[38%] left-1/2 h-[7.5rem] w-[8.5rem] -translate-x-1/2 touch-manipulation"
          onClick={onNext}
          type="button"
        >
          <Image
            src={petImage}
            alt="ペット"
            priority
            className="pointer-events-none h-full w-full object-contain"
          />
        </button>

        <div className="absolute bottom-[calc(0.25rem+var(--safe-area-bottom))] left-4">
          <RoundButton
            image="/icons/home.svg"
            label="ホームへ"
            onClick={onHome}
          />
        </div>
      </div>
    </main>
  );
}
