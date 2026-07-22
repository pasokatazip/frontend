import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";

type HomeLayoutProps = {
  children: ReactNode;
};

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const token = await getAuthTokenCookie();

  if (!token) {
    redirect("/Login");
  }

  const petId = getPetIdFromToken(token);

  if (!petId) {
    redirect("/Setup");
  }

  return <>{children}</>;
}
