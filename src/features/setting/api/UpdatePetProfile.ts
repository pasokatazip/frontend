import { apiFetch } from "@/lib/apiFetch";

type UpdatePetProfileValues = {
  color: string;
  name: string;
};

export async function updatePetProfile(
  token: string,
  petId: string,
  values: UpdatePetProfileValues,
) {
  await apiFetch(`/subsc/pet/${encodeURIComponent(petId)}`, {
    body: JSON.stringify(values),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
}
