"use client";

import petImage from "@public/images/home/pet.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostView } from "./PostView";
import { createPostAction } from "../actions/createPostAction";

export function PostContainer() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState<string>();

  async function handleSubmit(message: string) {
    setSubmitError(undefined);

    const result = await createPostAction({
      content: message,
    });

    if (result.success) {
      setMessage("");
      router.push("/PostSuccess");
      return;
    }

    setSubmitError(result.error);
  }
  function handleHome() {
    router.push("/Home");
  }

  return (
    <PostView
      message={message}
      submitError={submitError}
      onHome={handleHome}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
      petImage={petImage}
    />
  );
}
