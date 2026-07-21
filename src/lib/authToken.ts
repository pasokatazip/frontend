export function getPetIdFromToken(token: string): string | undefined {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64url").toString(),
  );

  return payload.pet_id;
}
