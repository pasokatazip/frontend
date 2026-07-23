import { z } from "zod";

const authTokenPayloadSchema = z.object({
  exp: z.number().int().positive().optional(),
  pet_id: z.string().min(1).optional(),
});

function getAuthTokenPayload(token: string) {
  const encodedPayload = token.split(".")[1];

  if (!encodedPayload) {
    return;
  }

  try {
    const payload: unknown = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString(),
    );
    const result = authTokenPayloadSchema.safeParse(payload);

    return result.success ? result.data : undefined;
  } catch {
    return;
  }
}

export function getAuthTokenExpiresAt(token: string) {
  const expiration = getAuthTokenPayload(token)?.exp;

  return expiration ? new Date(expiration * 1_000) : undefined;
}

export function isAuthTokenCurrent(token: string, now = Date.now()) {
  const payload = getAuthTokenPayload(token);

  if (!payload) {
    return false;
  }

  return payload.exp ? payload.exp * 1_000 > now : true;
}

export function getPetIdFromToken(token: string): string | undefined {
  return getAuthTokenPayload(token)?.pet_id;
}
