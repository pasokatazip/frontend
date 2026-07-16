"use client";

import { useEffect, useState } from "react";
import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { SettingView } from "./SettingView";

export function SettingContainer() {
  const [hue, setHue] = useState(0);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);

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
      petImage={{
        alt: "ペット",
        height: 323,
        src: "/images/home/pet.png",
        width: 364,
      }}
    />
  );
}
