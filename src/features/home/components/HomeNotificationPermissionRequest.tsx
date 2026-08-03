"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { registerNotificationSubscriptionAction } from "@/actions/RegisterNotificationSubscriptionAction";
import { getWebPushSubscriptionResult } from "@/lib/webPush";

const notificationPromptParameter = "notificationPermission";

export function HomeNotificationPermissionRequest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldRequest =
    searchParams.get(notificationPromptParameter) === "prompt";

  useEffect(() => {
    if (!shouldRequest) {
      return;
    }

    let cancelled = false;

    async function registerForNotifications() {
      const subscriptionResult = await getWebPushSubscriptionResult();

      if (subscriptionResult.success) {
        await registerNotificationSubscriptionAction(
          subscriptionResult.subscription,
        );
      }

      if (!cancelled) {
        router.replace("/Home");
      }
    }

    void registerForNotifications();

    return () => {
      cancelled = true;
    };
  }, [router, shouldRequest]);

  return null;
}
