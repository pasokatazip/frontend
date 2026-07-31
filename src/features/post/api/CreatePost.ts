import { apiFetch } from "@/lib/apiFetch";

type CreatePostValues = {
  content: string;
};

export async function createPost(
  token: string,
  petId: string,
  values: CreatePostValues,
) {
  await apiFetch(`/posts?pet_id=${petId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
}
