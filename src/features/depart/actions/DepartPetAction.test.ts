import { beforeEach, describe, expect, it, vi } from "vitest";
import { departPetAction } from "@/features/depart/actions/DepartPetAction";
import { ApiError } from "@/lib/apiFetch";

const mocks = vi.hoisted(() => ({
  deleteAuthCookies: vi.fn(),
  departPet: vi.fn(),
  getAuthTokenCookie: vi.fn(),
  grantSetupAccessCookie: vi.fn(),
  logServerError: vi.fn(),
  refreshAuthToken: vi.fn(),
  setAuthTokenCookie: vi.fn(),
}));

vi.mock("@/features/auth/api/RefreshAuthToken", () => ({
  refreshAuthToken: mocks.refreshAuthToken,
}));

vi.mock("@/features/depart/api/DepartPet", () => ({
  departPet: mocks.departPet,
}));

vi.mock("@/lib/authCookie", () => ({
  deleteAuthCookies: mocks.deleteAuthCookies,
  getAuthTokenCookie: mocks.getAuthTokenCookie,
  grantSetupAccessCookie: mocks.grantSetupAccessCookie,
  setAuthTokenCookie: mocks.setAuthTokenCookie,
}));

vi.mock("@/lib/serverLogger", () => ({
  logServerError: mocks.logServerError,
}));

beforeEach(() => {
  vi.resetAllMocks();
  mocks.getAuthTokenCookie.mockResolvedValue("old-token");
  mocks.refreshAuthToken.mockResolvedValue("refreshed-token");
});

describe("ペットの旅立ち", () => {
  it("未認証の場合はAPIを呼ばずエラーを返す", async () => {
    mocks.getAuthTokenCookie.mockImplementation(async () => {});

    await expect(departPetAction()).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
    expect(mocks.departPet).not.toHaveBeenCalled();
    expect(mocks.refreshAuthToken).not.toHaveBeenCalled();
  });

  it("旅立ち完了後にトークンを更新しSetupへの一時アクセスを許可する", async () => {
    await expect(departPetAction()).resolves.toEqual({
      destination: "/Setup",
      success: true,
    });

    expect(mocks.departPet).toHaveBeenCalledWith("old-token");
    expect(mocks.refreshAuthToken).toHaveBeenCalledWith("old-token");
    expect(mocks.setAuthTokenCookie).toHaveBeenCalledWith("refreshed-token");
    expect(mocks.grantSetupAccessCookie).toHaveBeenCalledOnce();
    expect(mocks.deleteAuthCookies).not.toHaveBeenCalled();
  });

  it("旅立ちAPIが401を返した場合は再ログインを促す", async () => {
    const apiError = new ApiError(401, "unauthorized");
    mocks.departPet.mockRejectedValue(apiError);

    await expect(departPetAction()).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
    expect(mocks.logServerError).toHaveBeenCalledWith(
      "Depart pet action failed",
      apiError,
    );
    expect(mocks.refreshAuthToken).not.toHaveBeenCalled();
    expect(mocks.deleteAuthCookies).not.toHaveBeenCalled();
  });

  it("旅立ちAPIが失敗した場合はペットを作成済みと扱わない", async () => {
    const apiError = new ApiError(500, "internal server error");
    mocks.departPet.mockRejectedValue(apiError);

    await expect(departPetAction()).resolves.toEqual({
      error:
        "旅立ちの準備を完了できませんでした。少し待ってからもう一度お試しください",
      success: false,
    });
    expect(mocks.refreshAuthToken).not.toHaveBeenCalled();
    expect(mocks.grantSetupAccessCookie).not.toHaveBeenCalled();
    expect(mocks.deleteAuthCookies).not.toHaveBeenCalled();
  });

  it("旅立ち完了後のトークン更新に失敗した場合は古い認証情報を削除する", async () => {
    const refreshError = new ApiError(500, "failed to refresh token");
    mocks.refreshAuthToken.mockRejectedValue(refreshError);

    await expect(departPetAction()).resolves.toEqual({
      destination: "/Login",
      success: true,
    });
    expect(mocks.departPet).toHaveBeenCalledWith("old-token");
    expect(mocks.deleteAuthCookies).toHaveBeenCalledOnce();
    expect(mocks.setAuthTokenCookie).not.toHaveBeenCalled();
    expect(mocks.grantSetupAccessCookie).not.toHaveBeenCalled();
    expect(mocks.logServerError).toHaveBeenCalledWith(
      "Depart pet action failed",
      refreshError,
    );
  });
});
