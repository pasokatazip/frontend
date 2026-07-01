import Image from "next/image";
import { Footer } from "@/components/Footer";

type HomeViewProps = {
  effectImage: {
    height: number;
    src: string;
    width: number;
  };
};

export function HomeView({ effectImage }: HomeViewProps) {
  return (
    <>
      <main className="mobile-screen bg-[url('/images/home/background.png')] bg-cover bg-center">
        <Image
          src={effectImage.src}
          alt=""
          width={effectImage.width}
          height={effectImage.height}
          className="mobile-safe-bottom-0 fixed left-0 max-w-fit"
        />
      </main>
      <Footer />
    </>
  );
}
