import { z } from "zod";

export const pushSubscriptionSchema = z.object({
  endpoint: z.url(),
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    auth: z.string().min(1),
    p256dh: z.string().min(1),
  }),
});

export type PushSubscriptionValues = z.infer<typeof pushSubscriptionSchema>;

function decodeBase64Url(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replaceAll("-", "+").replaceAll("_", "/");
  const bytes = window.atob(base64);

  return Uint8Array.from(bytes, (character) => character.charCodeAt(0));
}

export async function requestNotificationPermission() {
  if (!window.isSecureContext) {
    throw new Error("通知を利用するにはHTTPSで開いてください");
  }

  if (!("Notification" in window)) {
    throw new Error("このブラウザでは通知を利用できません");
  }

  const permission = await Notification.requestPermission();

  if (permission === "denied") {
    throw new Error("ブラウザまたは端末の設定から通知を許可してください");
  }

  if (permission !== "granted") {
    throw new Error("通知を許可してください");
  }

  return permission;
}

export async function getWebPushSubscription() {
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window)
  ) {
    throw new Error("このブラウザではプッシュ通知を利用できません");
  }

  await requestNotificationPermission();

  const registration = await navigator.serviceWorker.ready;
  const currentSubscription =
    await registration.pushManager.getSubscription();

  if (currentSubscription) {
    return pushSubscriptionSchema.parse(currentSubscription.toJSON());
  }

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey) {
    throw new Error("通知の公開鍵が設定されていません");
  }

  const subscription = await registration.pushManager.subscribe({
    applicationServerKey: decodeBase64Url(vapidPublicKey),
    userVisibleOnly: true,
  });

  return pushSubscriptionSchema.parse(subscription.toJSON());
}
