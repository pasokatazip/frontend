import { apiFetch } from "@/lib/apiFetch";

export async function departPet(token: string) {
  await apiFetch("/pets/departure", {
    body: JSON.stringify({ status: "departed" }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });
}
