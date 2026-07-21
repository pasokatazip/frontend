import Image from "next/image";
import { Footer } from "@/components/Footer";
import type { CurrentPet } from "@/features/home/api/GetCurrentPet";
import { HomePetField } from "./HomePetField";

type HomeViewProps = {
  effectImage: {
    height: number;
    src: string;
    width: number;
  };
  error?: string;
  pets: CurrentPet[];
  petImageUrl: string;
};

export function HomeView({
  effectImage,
  error,
  pets,
  petImageUrl,
}: HomeViewProps) {
  return (
    <>
      <main className="mobile-screen relative overflow-hidden bg-[url('/images/home/background.png')] bg-cover bg-center">
        <Image
          src={effectImage.src}
          alt=""
          width={effectImage.width}
          height={effectImage.height}
          loading="eager"
          className="mobile-safe-bottom-0 pointer-events-none fixed left-0 max-w-fit"
        />
        <HomePetField imageUrl={petImageUrl} pets={pets} />
        {error ? (
          <p
            aria-live="polite"
            className="absolute top-1/2 left-1/2 z-10 w-full -translate-x-1/2 text-center text-sm text-red-600"
          >
            {error}
          </p>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
