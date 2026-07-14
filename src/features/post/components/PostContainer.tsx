"use client";

import petImage from "@public/images/home/pet.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostView } from "./PostView";

export function PostContainer() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  function handleSubmit() {
    setMessage("");
    router.push("/PostSuccess");
  }

  function handleHome() {
    router.push("/Home");
  }

  return (
    <PostView
      message={message}
      onHome={handleHome}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
      petImage={petImage}
    />
  );
}
