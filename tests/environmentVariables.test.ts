import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const requiredEnvironmentVariables = [
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY",
  "PETYOYO_API_URL",
  "PETYOYO_IMAGE_URL",
  "PETYOYO_IMAGE_VERSION",
];

function readExampleEnvironmentVariableNames() {
  const exampleEnvironment = readFileSync(resolve(".env.example"), "utf8");

  return new Set(
    exampleEnvironment
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"))
      .map((line) => line.split("=", 1)[0]),
  );
}

describe("環境変数", () => {
  it("必須の環境変数が設定されている", () => {
    for (const name of requiredEnvironmentVariables) {
      expect(process.env[name], `${name} が設定されていません`).toBeTruthy();
    }
  });

  it("URLの環境変数が有効なURLである", () => {
    expect(() => new URL(process.env.PETYOYO_API_URL ?? "")).not.toThrow();
    expect(() => new URL(process.env.PETYOYO_IMAGE_URL ?? "")).not.toThrow();
  });

  it("必須の環境変数が.env.exampleに記載されている", () => {
    const exampleVariableNames = readExampleEnvironmentVariableNames();

    for (const name of requiredEnvironmentVariables) {
      expect(exampleVariableNames.has(name), `${name} の記載がありません`).toBe(true);
    }
  });
});
