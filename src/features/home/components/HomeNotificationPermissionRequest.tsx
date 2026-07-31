"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { requestNotificationPermission } from "@/lib/webPush";

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

    async function requestPermission() {
      await requestNotificationPermission();

      if (!cancelled) {
        router.replace("/Home");
      }
    }

    void requestPermission();

    return () => {
      cancelled = true;
    };
  }, [router, shouldRequest]);

  return null;
}
