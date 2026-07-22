import { redirect } from "next/navigation";
import { HomeContainer } from "@/features/home/components/HomeContainer";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";

export default async function Page() {
  const token = await getAuthTokenCookie();

  if (!token) {
    redirect("/Login");
  }

  const petId = getPetIdFromToken(token);

  if (!petId) {
    redirect("/Setup");
  }

  return <HomeContainer />;
}
