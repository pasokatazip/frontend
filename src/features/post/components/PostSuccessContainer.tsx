"use client";

import petImage from "@public/images/home/pet.png";
import { useRouter } from "next/navigation";
import { PostSuccessView } from "./PostSuccessView";

export function PostSuccessContainer() {
  const router = useRouter();

  function handleNext() {
    router.push("/Home");
  }

  return (
    <PostSuccessView
      onHome={handleNext}
      onNext={handleNext}
      petImage={petImage}
    />
  );
}
