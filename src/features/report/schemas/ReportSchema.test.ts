import { describe, expect, it } from "vitest";
import { ReportsResponseSchema } from "@/features/report/schemas/ReportSchema";

describe("ReportsResponseSchema", () => {
  it("レポートと対象日のほめた状態を読み込む", () => {
    const result = ReportsResponseSchema.parse({
      hasPraised: true,
      reports: [],
    });

    expect(result).toEqual({ hasPraised: true, reports: [] });
  });

  it("hasPraisedがないレスポンスを拒否する", () => {
    expect(() => ReportsResponseSchema.parse({ reports: [] })).toThrow();
  });
});
