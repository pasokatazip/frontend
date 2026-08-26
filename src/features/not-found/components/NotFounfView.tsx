"use client";

import Image from "next/image";
import { BlueButton } from "@/components/ui/button/BlueButton";
import { DialoguePanel } from "@/components/ui/dialogue/DialoguePanel";
import Link from "next/link";

export function NotFoundView() {
  return (
    <main className="login-screen mobile-screen auth-screen flex-col items-center justify-center bg-[url('/images/top/background.png')] bg-cover bg-center px-6">
      <div className="absolute top-1/3 left-1/2 flex w-full max-w-[20rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <Image
          src="/images/not-found/404.svg"
          alt="404 Not Found"
          width={280}
          height={136}
        />

        <BlueButton
          className="mt-10 w-full text-base"
          style={{ height: "47px" }}
        >
          <Link href="/Home" className="w-full">
            トップに戻る
          </Link>
        </BlueButton>
      </div>

      <Image
        src="/images/subscription/doctor.png"
        alt="ドクター"
        width={512}
        height={512}
        priority
        className="absolute right-[-0.75rem] bottom-[12.50rem] h-[12.5rem] w-[13.25rem] object-contain"
      />
      <div className="absolute right-4 bottom-[calc(2rem+var(--safe-area-bottom))] left-4 z-20">
        <DialoguePanel
          message="YO-YOも歩けば棒に当たるぞい"
          showNextIndicator={false}
          speaker="Dr.YOはかせ"
        />
      </div>
    </main>
  );
}
