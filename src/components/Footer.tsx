import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";

export function Footer() {
  return (
    <footer className="fixed bottom-[calc(2.5rem+env(safe-area-inset-bottom))] left-0 min-w-full px-4">
      <nav className="flex justify-center gap-5">
        <RoundButton image="/icons/book.svg" label="きろく" className="" />
        <GreenButton className="max-h-12.5 min-w-40 rounded-xl rounded-bl-xs">
          つぶやく
        </GreenButton>
        <RoundButton image="/icons/menu.svg" label="メニュー" className="" />
      </nav>
    </footer>
  );
}
