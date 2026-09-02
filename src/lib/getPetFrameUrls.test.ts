import { afterEach, describe, expect, it, vi } from "vitest";
import { getPetFrameUrls } from "./getPetFrameUrls";

describe("getPetFrameUrls", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("フォルダ名と異なるファイル接頭辞を指定できる", () => {
    vi.stubEnv("PETYOYO_IMAGE_URL", "https://assets.example.com");
    vi.stubEnv("PETYOYO_IMAGE_VERSION", "20260902-1");

    expect(
      getPetFrameUrls({
        filePrefix: "Loading",
        folderName: "Loadings",
        frameCount: 3,
      }),
    ).toEqual([
      "https://assets.example.com/assets/Loadings/Loading1.webp?v=20260902-1",
      "https://assets.example.com/assets/Loadings/Loading2.webp?v=20260902-1",
      "https://assets.example.com/assets/Loadings/Loading3.webp?v=20260902-1",
    ]);
  });

  it("ファイル接頭辞の省略時は従来どおりフォルダ名を使う", () => {
    vi.stubEnv("PETYOYO_IMAGE_URL", "");
    vi.stubEnv("PETYOYO_IMAGE_VERSION", "");

    expect(
      getPetFrameUrls({ folderName: "BabyPet", frameCount: 2 }),
    ).toEqual([
      "/assets/BabyPet/BabyPet1.webp",
      "/assets/BabyPet/BabyPet2.webp",
    ]);
  });
});
