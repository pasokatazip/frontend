import { apiFetch } from "@/lib/apiFetch";

type CreatePetValues = {
  color: string;
  name: string;
};

export async function createPet(token: string, values: CreatePetValues) {
  await apiFetch("/pets", {
    body: JSON.stringify(values),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
