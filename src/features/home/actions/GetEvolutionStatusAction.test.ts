import { beforeEach, describe, expect, it, vi } from "vitest";
import { getEvolutionStatusAction } from "@/features/home/actions/GetEvolutionStatusAction";
import { ApiError } from "@/lib/apiFetch";

const mocks = vi.hoisted(() => ({
  getAuthTokenCookie: vi.fn(),
  getEvolutionStatus: vi.fn(),
  logServerError: vi.fn(),
}));

vi.mock("@/features/home/api/GetEvolutionStatus", () => ({
  getEvolutionStatus: mocks.getEvolutionStatus,
}));

vi.mock("@/lib/authCookie", () => ({
  getAuthTokenCookie: mocks.getAuthTokenCookie,
}));

vi.mock("@/lib/serverLogger", () => ({
  logServerError: mocks.logServerError,
}));

const evolutionStatus = {
  canEvolve: true,
  currentStageKey: "akago",
  currentStageNo: 0,
  nextStageKey: "amae_energy",
  petId: "pet-id",
};

beforeEach(() => {
  vi.resetAllMocks();
  mocks.getAuthTokenCookie.mockResolvedValue("token");
  mocks.getEvolutionStatus.mockResolvedValue(evolutionStatus);
});

describe("進化状態の取得", () => {
  it("未認証の場合はAPIを呼ばずエラーを返す", async () => {
    mocks.getAuthTokenCookie.mockImplementation(async () => {});

    await expect(getEvolutionStatusAction()).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
    expect(mocks.getEvolutionStatus).not.toHaveBeenCalled();
  });

  it("進化可否と現在・次の進化段階を返す", async () => {
    await expect(getEvolutionStatusAction()).resolves.toEqual({
      status: evolutionStatus,
      success: true,
    });
    expect(mocks.getEvolutionStatus).toHaveBeenCalledWith("token");
    expect(mocks.logServerError).not.toHaveBeenCalled();
  });

  it("APIが401を返した場合は再ログインを促す", async () => {
    mocks.getEvolutionStatus.mockRejectedValue(
      new ApiError(401, "unauthorized"),
    );

    await expect(getEvolutionStatusAction()).resolves.toEqual({
      error: "ログインし直してください",
      success: false,
    });
    expect(mocks.logServerError).not.toHaveBeenCalled();
  });

  it("APIの障害時はログを残し利用者向けエラーを返す", async () => {
    const apiError = new ApiError(500, "internal server error");
    mocks.getEvolutionStatus.mockRejectedValue(apiError);

    await expect(getEvolutionStatusAction()).resolves.toEqual({
      error: "進化情報を取得できませんでした",
      success: false,
    });
    expect(mocks.logServerError).toHaveBeenCalledWith(
      "Get evolution status action failed",
      apiError,
    );
  });
});
