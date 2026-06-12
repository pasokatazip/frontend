import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main className="min-h-svh bg-[url('/images/home/background.png')] bg-cover bg-center">
        <div className="flex min-h-svh items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Home</h1>
        </div>
        <img
          src="/images/home/effect.png"
          alt=""
          className="fixed max-w-fit left-0 bottom-0"
        />
      </main>
      <Footer />
    </>
  );
}
