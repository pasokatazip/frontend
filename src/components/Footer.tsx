import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";

export function Footer() {
  return (
    <footer className="fixed bottom-10 left-0 min-w-full px-4">
      <nav className="flex justify-center gap-5">
        <RoundButton image="/icons/book.svg" label="きろく" className="" />
        <GreenButton
          children="つぶやく"
          className="rounded-xl rounded-bl-xs max-h-12.5 min-w-40"
        />
        <RoundButton image="/icons/menu.svg" label="メニュー" className="" />
      </nav>
    </footer>
  );
}
