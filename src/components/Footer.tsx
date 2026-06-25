"use client";

import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { Hamburger } from "@/components/Hamburger";
import { useState } from "react";
import clsx from "clsx";

export function Footer() {
  const [openMenu, setMenu] = useState(false);
  const menuFunction = () => {
    setMenu(!openMenu);
  };
  return (
    <footer className="mobile-safe-footer fixed left-0 min-w-full px-4">
      <nav className="flex justify-center gap-5">
        <RoundButton image="/icons/book.svg" label="きろく" className="" />
        <GreenButton className="max-h-12.5 min-w-40 rounded-xl rounded-bl-xs">
          つぶやく
        </GreenButton>
        <RoundButton
          image="/icons/menu.svg"
          label="メニュー"
          className=""
          onClick={menuFunction}
        />
      </nav>
      <div
        onClick={() => setMenu(false)}
        className={clsx(
          "fixed inset-0 bg-black transition-opacity duration-300 pointer-events-none",
          openMenu ? "opacity-25" : "opacity-0 pointer-events-none",
        )}
      />{" "}
      <Hamburger
        onClose={() => setMenu(false)}
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
