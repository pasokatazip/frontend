import Image from "next/image";
import { Footer } from "@/components/Footer";

type HomeViewProps = {
  effectImage: {
    height: number;
    src: string;
    width: number;
  };
  title: string;
};

export function HomeView({ effectImage, title }: HomeViewProps) {
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
