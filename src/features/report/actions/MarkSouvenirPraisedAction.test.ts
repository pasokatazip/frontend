import { beforeEach, describe, expect, it, vi } from "vitest";
import { markSouvenirPraisedAction } from "@/features/report/actions/MarkSouvenirPraisedAction";
import { ApiError } from "@/lib/apiFetch";

const mocks = vi.hoisted(() => ({
  getAuthTokenCookie: vi.fn(),
  logServerError: vi.fn(),
  markSouvenirPraised: vi.fn(),
}));

vi.mock("@/features/report/api/MarkSouvenirPraised", () => ({
  markSouvenirPraised: mocks.markSouvenirPraised,
}));

vi.mock("@/lib/authCookie", () => ({
  getAuthTokenCookie: mocks.getAuthTokenCookie,
}));

vi.mock("@/lib/serverLogger", () => ({
  logServerError: mocks.logServerError,
}));

beforeEach(() => {
  vi.resetAllMocks();
  mocks.getAuthTokenCookie.mockResolvedValue("token");
  mocks.markSouvenirPraised.mockResolvedValue({
    hasPraised: true,
    praisedAt: "2026-08-29T10:00:00Z",
    reportDate: "2026-08-28",
  });
});

describe("レポートのおみやげをほめる", () => {
  it("対象日の選択済み状態を保存する", async () => {
    await expect(markSouvenirPraisedAction("2026-08-28")).resolves.toEqual({
      success: true,
    });
    expect(mocks.markSouvenirPraised).toHaveBeenCalledWith(
      "token",
      "2026-08-28",
    );
  });

  it("存在しない日付はAPIへ送信しない", async () => {
    await expect(markSouvenirPraisedAction("2026-02-30")).resolves.toEqual({
      error:
        "ほめた記録を保存できませんでした。少し待ってからもう一度お試しください",
      success: false,
    });
    expect(mocks.getAuthTokenCookie).not.toHaveBeenCalled();
    expect(mocks.markSouvenirPraised).not.toHaveBeenCalled();
  });

  it("未認証の場合は再ログインを促す", async () => {
    mocks.getAuthTokenCookie.mockImplementation(async () => {});

    await expect(markSouvenirPraisedAction("2026-08-28")).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
    expect(mocks.markSouvenirPraised).not.toHaveBeenCalled();
  });

  it("認証エラーの場合は再ログインを促す", async () => {
    mocks.markSouvenirPraised.mockRejectedValue(
      new ApiError(401, "unauthorized"),
    );

    await expect(markSouvenirPraisedAction("2026-08-28")).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
  });

  it("レスポンスの対象日が異なる場合は成功扱いしない", async () => {
    mocks.markSouvenirPraised.mockResolvedValue({
      hasPraised: true,
      praisedAt: "2026-08-29T10:00:00Z",
      reportDate: "2026-08-27",
    });

    await expect(markSouvenirPraisedAction("2026-08-28")).resolves.toEqual({
      error:
        "ほめた記録を保存できませんでした。少し待ってからもう一度お試しください",
      success: false,
    });
    expect(mocks.logServerError).toHaveBeenCalledOnce();
  });
});
