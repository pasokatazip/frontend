"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { Hamburger } from "./Hamburger";

type FooterProps = {
  onLogout: () => void;
  onPost: () => void;
};

export function Footer({ onLogout, onPost }: FooterProps) {
  const [openMenu, setMenu] = useState(false);

  function handleMenuToggle() {
    setMenu((isOpen) => !isOpen);
  }

  return (
    <footer className="mobile-safe-footer fixed left-0 z-20 min-w-full px-4">
      <nav className="flex justify-center gap-5">
        <Link href="/Report">
          <RoundButton image="/icons/book.svg" label="きろく" className="" />
        </Link>
        <GreenButton
          className="max-h-12.5 min-w-40 rounded-xl rounded-bl-xs"
          onClick={onPost}
        >
          つぶやく
        </GreenButton>
        <RoundButton
          image="/icons/menu.svg"
          label="メニュー"
          className=""
          onClick={handleMenuToggle}
        />
      </nav>
      <button
        type="button"
        aria-label="メニューを閉じる"
        onClick={() => setMenu(false)}
        className={clsx(
          "fixed inset-0 bg-black transition-opacity duration-300",
          openMenu
            ? "opacity-25 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />
      <Hamburger
        onClose={() => setMenu(false)}
        onLogout={onLogout}
        className={clsx(
          "transition-all duration-300",
          openMenu
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none",
        )}
      />
    </footer>
  );
}
