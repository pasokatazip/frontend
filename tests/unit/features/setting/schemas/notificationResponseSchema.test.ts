import { describe, expect, it } from "vitest";
import { notificationResponseSchema } from "@/features/setting/schemas/notificationResponseSchema";

describe("通知設定レスポンスの変換", () => {
  it("APIレスポンスをフロントの通知設定へ変換する", () => {
    expect(
      notificationResponseSchema.parse({
        id: "notification-id",
        is_all_enabled: true,
        is_message_enabled: false,
        is_report_enabled: true,
        is_yoyo_enabled: false,
      }),
    ).toEqual({
      id: "notification-id",
      settings: {
        isAllEnabled: true,
        isMessageEnabled: false,
        isReportEnabled: true,
        isYoyoEnabled: false,
      },
    });
  });
});
