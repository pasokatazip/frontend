"use client";

import { useEffect, useState } from "react";
import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { startSubscriptionCheckoutAction } from "@/features/subscription/actions/StartSubscriptionCheckoutAction";
import { SubscriptionView } from "./SubscriptionView";
import { usePetSession } from "@/hooks/usePetSession";

export function SubscriptionContainer() {
  const [error, setError] = useState<string>();
  const [isCheckoutStarting, setIsCheckoutStarting] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [isSubscriptionStatusLoading, setIsSubscriptionStatusLoading] =
    useState(true);

  const petSnapshot = usePetSession();

  useEffect(() => {
    let cancelled = false;

    async function loadSubscriptionStatus() {
      const result = await getSubscriptionStatusAction();

      if (cancelled) {
        return;
      }

      if (result.success) {
        setIsSubscriptionActive(result.status.active);
      } else {
        setError(result.error);
      }

      setIsSubscriptionStatusLoading(false);
    }

    void loadSubscriptionStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCheckoutStart() {
    setError(undefined);
    setIsCheckoutStarting(true);

    const result = await startSubscriptionCheckoutAction();

    if (result.success) {
      window.location.assign(result.checkoutUrl);
      return;
    }

    setError(result.error);
    setIsCheckoutStarting(false);
  }

  return (
    <SubscriptionView
      benefits={[
        {
          image: {
            alt: "過去レポート全開放",
            height: 810,
            src: "/images/subscription/reportyo-yo.png",
            width: 810,
          },
          title: "過去レポート全開放",
        },
        {
          image: {
            alt: "ペットの名前変更",
            height: 810,
            src: "/images/subscription/nameyo-yo.png",
            width: 810,
          },
          title: "ペットの名前変更",
        },
        {
          image: {
            alt: "ペットの色変更",
            height: 810,
            src: "/images/subscription/coloryo-yo.png",
            width: 810,
          },
          title: "ペットの色変更",
        },
      ]}
      doctorImage={{
        alt: "ドクター",
        height: 570,
        src: "/images/subscription/doctor.png",
        width: 468,
      }}
      pet={petSnapshot}
      checkoutError={error}
      isCheckoutStarting={isCheckoutStarting}
      isSubscriptionActive={isSubscriptionActive}
      isSubscriptionStatusLoading={isSubscriptionStatusLoading}
      onCheckoutStart={handleCheckoutStart}
    />
  );
}
