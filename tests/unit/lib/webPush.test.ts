import { afterEach, describe, expect, it, vi } from "vitest";
import { getWebPushSubscriptionResult } from "@/lib/webPush";

const subscription = {
  endpoint: "https://push.example.com/subscriptions/1",
  expirationTime: null,
  keys: {
    auth: "auth-key",
    p256dh: "p256dh-key",
  },
};

function stubNotificationPermission(permission: NotificationPermission) {
  const notification = {
    requestPermission: vi.fn().mockResolvedValue(permission),
  };

  vi.stubGlobal("Notification", notification);
  vi.stubGlobal("window", {
    Notification: notification,
    PushManager: class {},
    atob: globalThis.atob.bind(globalThis),
    isSecureContext: true,
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Web Push購読情報の取得", () => {
  it("既存のPush購読情報を返す", async () => {
    stubNotificationPermission("granted");
    vi.stubGlobal("navigator", {
      serviceWorker: {
        ready: Promise.resolve({
          pushManager: {
            getSubscription: vi.fn().mockResolvedValue({
              toJSON: () => subscription,
            }),
          },
        }),
      },
    });

    await expect(getWebPushSubscriptionResult()).resolves.toEqual({
      subscription,
      success: true,
    });
  });

  it("通知が拒否されている場合はエラーを返す", async () => {
    stubNotificationPermission("denied");
    vi.stubGlobal("navigator", { serviceWorker: {} });

    await expect(getWebPushSubscriptionResult()).resolves.toEqual({
      error: "ブラウザまたは端末の設定から通知を許可してください",
      success: false,
    });
  });

  it("既存の購読情報がない場合はVAPIDキーを使って新規購読する", async () => {
    stubNotificationPermission("granted");
    vi.stubEnv("NEXT_PUBLIC_VAPID_PUBLIC_KEY", "AQID");
    const subscribe = vi.fn().mockResolvedValue({
      toJSON: () => subscription,
    });
    vi.stubGlobal("navigator", {
      serviceWorker: {
        ready: Promise.resolve({
          pushManager: {
            getSubscription: vi.fn().mockResolvedValue(null),
            subscribe,
          },
        }),
      },
    });

    await expect(getWebPushSubscriptionResult()).resolves.toEqual({
      subscription,
      success: true,
    });
    expect(subscribe).toHaveBeenCalledWith({
      applicationServerKey: new Uint8Array([1, 2, 3]),
      userVisibleOnly: true,
    });
  });

  it("VAPIDキーが未設定の場合はエラーを返す", async () => {
    stubNotificationPermission("granted");
    vi.stubEnv("NEXT_PUBLIC_VAPID_PUBLIC_KEY", "");
    vi.stubGlobal("navigator", {
      serviceWorker: {
        ready: Promise.resolve({
          pushManager: {
            getSubscription: vi.fn().mockResolvedValue(null),
          },
        }),
      },
    });

    await expect(getWebPushSubscriptionResult()).resolves.toEqual({
      error: "通知の公開鍵が設定されていません",
      success: false,
    });
  });
});
