"use client";

import { useRouter } from "next/navigation";
import { PostSuccessView } from "./PostSuccessView";
import { usePetSession } from "@/hooks/usePetSession";

export function PostSuccessContainer() {
  const router = useRouter();
  const petSnapshot = usePetSession();

  function handleNext() {
    router.push("/Home");
  }

  return (
    <PostSuccessView
      onHome={handleNext}
      onNext={handleNext}
      pet={petSnapshot}
    />
  );
}
