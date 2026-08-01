"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/logoutAction";
import { Footer } from "@/components/Footer";
import { clearPurchaseConfirmationPending } from "@/lib/purchaseConfirmationStorage";
import { usePetProgressStore } from "@/stores/usePetProgressStore";

export function HomeFooterContainer() {
  const router = useRouter();

  async function handleLogout() {
    usePetProgressStore.getState().reset();
    await usePetProgressStore.persist.clearStorage();
    clearPurchaseConfirmationPending();
    await logoutAction();
    window.location.replace("/Login");
  }

  return (
    <Footer
      onLogout={handleLogout}
      onPost={() => router.push("/Post")}
    />
  );
}
