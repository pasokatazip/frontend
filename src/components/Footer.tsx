"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { logoutAction } from "@/actions/logoutAction";
import { Hamburger } from "@/components/Hamburger";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { usePetProgressStore } from "@/stores/usePetProgressStore";

const purchaseConfirmationPendingKey = "purchase-confirmation-pending";

export function Footer() {
  const router = useRouter();
  const [openMenu, setMenu] = useState(false);
  const menuFunction = () => {
    setMenu(!openMenu);
  };

  async function handleLogout() {
    usePetProgressStore.getState().reset();
    await usePetProgressStore.persist.clearStorage();
    sessionStorage.removeItem(purchaseConfirmationPendingKey);
    await logoutAction();
  }

  return (
    <footer className="mobile-safe-footer fixed left-0 z-20 min-w-full px-4">
      <nav className="flex justify-center gap-5">
        <Link href="/Report">
          <RoundButton image="/icons/book.svg" label="きろく" className="" />
        </Link>
        <GreenButton
          className="max-h-12.5 min-w-40 rounded-xl rounded-bl-xs"
          onClick={() => router.push("/Post")}
        >
          つぶやく
        </GreenButton>
        <RoundButton
          image="/icons/menu.svg"
          label="メニュー"
          className=""
          onClick={menuFunction}
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
        onLogout={handleLogout}
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
