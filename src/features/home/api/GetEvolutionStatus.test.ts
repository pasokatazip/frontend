import { beforeEach, describe, expect, it, vi } from "vitest";
import { getEvolutionStatus } from "@/features/home/api/GetEvolutionStatus";

const mocks = vi.hoisted(() => ({
  apiFetch: vi.fn(),
}));

vi.mock("@/lib/apiFetch", () => ({
  apiFetch: mocks.apiFetch,
}));

function responseWith(body: unknown) {
  return {
    json: vi.fn().mockResolvedValue(body),
  };
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("進化状態API", () => {
  it("認証トークンを付けて進化状態を取得する", async () => {
    mocks.apiFetch.mockResolvedValue(
      responseWith({
        can_evolve: true,
        current_stage: {
          stage_key: "akago",
          stage_no: 0,
        },
        next_stages: [
          {
            selected_for_pet: false,
            to_stage: {
              stage_key: "amae_sociality",
              stage_no: 1,
            },
          },
          {
            selected_for_pet: true,
            to_stage: {
              stage_key: "amae_energy",
              stage_no: 1,
            },
          },
        ],
        pet_id: "pet-id",
      }),
    );

    await expect(getEvolutionStatus("token")).resolves.toEqual({
      canEvolve: true,
      currentStageKey: "akago",
      currentStageNo: 0,
      nextStageKey: "amae_energy",
      petId: "pet-id",
    });
    expect(mocks.apiFetch).toHaveBeenCalledWith("/pets/evolution-status", {
      headers: {
        Authorization: "Bearer token",
      },
      method: "GET",
    });
  });

  it("選択済みの次ステージがない場合はnextStageKeyを省略する", async () => {
    mocks.apiFetch.mockResolvedValue(
      responseWith({
        can_evolve: false,
        current_stage: {
          stage_key: "amae_energy",
          stage_no: 1,
        },
        next_stages: [],
        pet_id: "pet-id",
      }),
    );

    await expect(getEvolutionStatus("token")).resolves.toEqual({
      canEvolve: false,
      currentStageKey: "amae_energy",
      currentStageNo: 1,
      nextStageKey: undefined,
      petId: "pet-id",
    });
  });

  it("進化レスポンスが不正な場合は検証エラーにする", async () => {
    mocks.apiFetch.mockResolvedValue(
      responseWith({
        can_evolve: "yes",
        current_stage: null,
        next_stages: [],
        pet_id: "",
      }),
    );

    await expect(getEvolutionStatus("token")).rejects.toThrow();
  });
});
