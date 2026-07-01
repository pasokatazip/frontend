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
      <main className="min-h-svh bg-[url('/images/home/background.png')] bg-cover bg-center">
        <Image
          src={effectImage.src}
          alt=""
          width={effectImage.width}
          height={effectImage.height}
          className="fixed bottom-0 left-0 max-w-fit"
        />
      </main>
      <Footer />
    </>
  );
}
