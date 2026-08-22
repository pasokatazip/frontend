import { RoundButton } from "@/components/ui/button/RoundButton";
import { SilverButton } from "@/components/ui/button/SilverButton";
import Link from "next/link";

export function HelpView() {
  return (
    <>
      <main className="mobile-screen bg-[url('/images/background.png')] bg-cover bg-center flex items-center justify-center">
        <Link href="/Help/Tutorial" className="w-full mx-[48px]">
          <SilverButton className="h-[50px] text-[16px]">
            チュートリアル
          </SilverButton>
        </Link>
      </main>
      <footer className="fixed bottom-8.5 flex min-w-full gap-20 px-4">
        <Link href="/Home">
          <RoundButton image="/icons/home.svg" label="ホームへ" />
        </Link>
      </footer>
    </>
  );
}
