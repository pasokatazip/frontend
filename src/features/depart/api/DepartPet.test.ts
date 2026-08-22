import { beforeEach, describe, expect, it, vi } from "vitest";
import { departPet } from "@/features/depart/api/DepartPet";

const mocks = vi.hoisted(() => ({
  apiFetch: vi.fn(),
}));

vi.mock("@/lib/apiFetch", () => ({
  apiFetch: mocks.apiFetch,
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("旅立ちAPI", () => {
  it("認証トークンとdepartedステータスを送信する", async () => {
    await departPet("token");

    expect(mocks.apiFetch).toHaveBeenCalledWith("/pets/departure", {
      body: JSON.stringify({ status: "departed" }),
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
  });

  it("APIの失敗を呼び出し元に伝播する", async () => {
    const error = new Error("network error");
    mocks.apiFetch.mockRejectedValue(error);

    await expect(departPet("token")).rejects.toBe(error);
  });
});
