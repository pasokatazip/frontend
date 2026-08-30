"use server";

import { markSouvenirPraised } from "@/features/report/api/MarkSouvenirPraised";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const unauthorizedMessage = "ログインし直してください";
const praiseFailedMessage =
  "ほめた記録を保存できませんでした。少し待ってからもう一度お試しください";

export type MarkSouvenirPraisedActionResult =
  | { success: true }
  | { error: string; success: false };

export async function markSouvenirPraisedAction(
  reportDate: string,
): Promise<MarkSouvenirPraisedActionResult> {
  if (!isValidReportDate(reportDate)) {
    return { error: praiseFailedMessage, success: false };
  }

  const token = await getAuthTokenCookie();
  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    const result = await markSouvenirPraised(token, reportDate);
    if (result.reportDate !== reportDate) {
      throw new Error("Souvenir praise response date does not match request");
    }

    return { success: true };
  } catch (error) {
    logServerError("Mark souvenir praised action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }
    return { error: praiseFailedMessage, success: false };
  }
}

function isValidReportDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}
