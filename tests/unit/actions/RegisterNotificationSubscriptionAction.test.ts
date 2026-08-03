import { beforeEach, describe, expect, it, vi } from "vitest";
import { registerNotificationSubscriptionAction } from "@/actions/RegisterNotificationSubscriptionAction";
import { ApiError } from "@/lib/apiFetch";

const mocks = vi.hoisted(() => ({
  createNotificationSettings: vi.fn(),
  getAuthTokenCookie: vi.fn(),
  getNotificationSettings: vi.fn(),
  logServerError: vi.fn(),
  updateNotificationSettings: vi.fn(),
}));

vi.mock("@/features/setting/api/CreateNotificationSettings", () => ({
  createNotificationSettings: mocks.createNotificationSettings,
}));

vi.mock("@/features/setting/api/GetNotificationSettings", () => ({
  getNotificationSettings: mocks.getNotificationSettings,
}));

vi.mock("@/features/setting/api/UpdateNotificationSettings", () => ({
  updateNotificationSettings: mocks.updateNotificationSettings,
}));

vi.mock("@/lib/authCookie", () => ({
  getAuthTokenCookie: mocks.getAuthTokenCookie,
}));

vi.mock("@/lib/serverLogger", () => ({
  logServerError: mocks.logServerError,
}));

const subscription = {
  endpoint: "https://push.example.com/subscriptions/1",
  expirationTime: null,
  keys: {
    auth: "auth-key",
    p256dh: "p256dh-key",
  },
};

beforeEach(() => {
  vi.resetAllMocks();
  mocks.getAuthTokenCookie.mockResolvedValue("token");
});

describe("通知購読情報の登録", () => {
  it("購読情報が不正な場合はトークンを取得せずエラーを返す", async () => {
    await expect(
      registerNotificationSubscriptionAction({ endpoint: "invalid" }),
    ).resolves.toEqual({
      error: "通知の購読情報が正しくありません",
      success: false,
    });
    expect(mocks.getAuthTokenCookie).not.toHaveBeenCalled();
  });

  it("未認証の場合はエラーを返す", async () => {
    mocks.getAuthTokenCookie.mockImplementation(async () => {});

    await expect(
      registerNotificationSubscriptionAction(subscription),
    ).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
  });

  it("通知設定が未登録の場合は初期設定を作成する", async () => {
    mocks.getNotificationSettings.mockRejectedValue(
      new ApiError(404, "not found"),
    );

    await expect(
      registerNotificationSubscriptionAction(subscription),
    ).resolves.toEqual({ success: true });
    expect(mocks.createNotificationSettings).toHaveBeenCalledWith("token", {
      isAllEnabled: true,
      isMessageEnabled: false,
      isReportEnabled: false,
      isYoyoEnabled: true,
      subscription,
    });
    expect(mocks.updateNotificationSettings).not.toHaveBeenCalled();
  });

  it("通知設定が登録済みの場合は設定を維持して購読情報を更新する", async () => {
    const settings = {
      isAllEnabled: true,
      isMessageEnabled: true,
      isReportEnabled: true,
      isYoyoEnabled: false,
    };
    mocks.getNotificationSettings.mockResolvedValue({
      id: "notification-id",
      settings,
    });

    await expect(
      registerNotificationSubscriptionAction(subscription),
    ).resolves.toEqual({ success: true });
    expect(mocks.updateNotificationSettings).toHaveBeenCalledWith("token", {
      ...settings,
      subscription,
    });
    expect(mocks.createNotificationSettings).not.toHaveBeenCalled();
  });

  it("通知APIに失敗した場合はエラーを返す", async () => {
    const apiError = new ApiError(500, "internal server error");
    mocks.getNotificationSettings.mockRejectedValue(apiError);

    await expect(
      registerNotificationSubscriptionAction(subscription),
    ).resolves.toEqual({
      error: "通知を登録できませんでした",
      success: false,
    });
    expect(mocks.logServerError).toHaveBeenCalledWith(
      "Register notification subscription action failed",
      apiError,
    );
    expect(mocks.createNotificationSettings).not.toHaveBeenCalled();
  });

  it("通知設定の新規作成に失敗した場合はエラーを返す", async () => {
    const apiError = new ApiError(500, "failed to create notification");
    mocks.getNotificationSettings.mockRejectedValue(
      new ApiError(404, "not found"),
    );
    mocks.createNotificationSettings.mockRejectedValue(apiError);

    await expect(
      registerNotificationSubscriptionAction(subscription),
    ).resolves.toEqual({
      error: "通知を登録できませんでした",
      success: false,
    });
    expect(mocks.logServerError).toHaveBeenCalledWith(
      "Register notification subscription action failed",
      apiError,
    );
  });

  it("通知設定の更新に失敗した場合はエラーを返す", async () => {
    const apiError = new ApiError(500, "failed to update notification");
    mocks.getNotificationSettings.mockResolvedValue({
      id: "notification-id",
      settings: {
        isAllEnabled: true,
        isMessageEnabled: true,
        isReportEnabled: true,
        isYoyoEnabled: true,
      },
    });
    mocks.updateNotificationSettings.mockRejectedValue(apiError);

    await expect(
      registerNotificationSubscriptionAction(subscription),
    ).resolves.toEqual({
      error: "通知を登録できませんでした",
      success: false,
    });
    expect(mocks.logServerError).toHaveBeenCalledWith(
      "Register notification subscription action failed",
      apiError,
    );
  });
});
