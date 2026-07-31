"use client";

import { useEffect, useState } from "react";
import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { SettingView } from "./SettingView";
import { usePetSession } from "@/hooks/usePetSession";

export function SettingContainer() {
  const [hue, setHue] = useState(0);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const petSnapshot = usePetSession();

  useEffect(() => {
    let cancelled = false;

    async function loadSubscriptionStatus() {
      const result = await getSubscriptionStatusAction();

      if (!cancelled && result.success) {
        setIsSubscriptionActive(result.status.active);
      }
    }

    void loadSubscriptionStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SettingView
      hue={hue}
      isSubscriptionActive={isSubscriptionActive}
      onHueChange={setHue}
      pet={petSnapshot}
    />
  );
}
