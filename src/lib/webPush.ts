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

type NotificationPermissionResult =
  | { granted: true }
  | { error: string; granted: false };

function decodeBase64Url(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replaceAll("-", "+").replaceAll("_", "/");
  const bytes = window.atob(base64);

  return Uint8Array.from(bytes, (character) => character.charCodeAt(0));
}

export async function requestNotificationPermission(): Promise<NotificationPermissionResult> {
  if (!window.isSecureContext) {
    return { error: "通知を利用するにはHTTPSで開いてください", granted: false };
  }

  if (!("Notification" in window)) {
    return { error: "このブラウザでは通知を利用できません", granted: false };
  }

  let permission: NotificationPermission;

  try {
    permission = await Notification.requestPermission();
  } catch {
    return { error: "通知の許可を確認できませんでした", granted: false };
  }

  if (permission === "denied") {
    return {
      error: "ブラウザまたは端末の設定から通知を許可してください",
      granted: false,
    };
  }

  if (permission !== "granted") {
    return { error: "通知を許可してください", granted: false };
  }

  return { granted: true };
}

export async function getWebPushSubscription() {
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window)
  ) {
    throw new Error("このブラウザではプッシュ通知を利用できません");
  }

  const permissionResult = await requestNotificationPermission();

  if (!permissionResult.granted) {
    throw new Error(permissionResult.error);
  }

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
