"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { GetMyPet } from "../ui/pet/GetMyPet";
import { PetSnapshot } from "@/types/pet";

type PetComposerLayoutProps = {
  children: ReactNode;
  pet: PetSnapshot;
};

function useLockedDocumentViewport() {
  useEffect(() => {
    const scrollY = window.scrollY;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyStyles = {
      left: document.body.style.left,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      right: document.body.style.right,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.documentElement.style.overflow = "hidden";
    Object.assign(document.body.style, {
      left: "0",
      overflow: "hidden",
      position: "fixed",
      right: "0",
      top: `-${scrollY}px`,
      width: "100%",
    });

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      Object.assign(document.body.style, bodyStyles);
      window.scrollTo(0, scrollY);
    };
  }, []);
}

export function PetComposerLayout({ children, pet }: PetComposerLayoutProps) {
  useLockedDocumentViewport();

  return (
    <main className="fixed inset-0 h-[100lvh] overflow-hidden overscroll-none">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat"
      />

      <div className="relative mx-auto h-full w-full max-w-[29rem]">
        <GetMyPet
          pet={pet}
          size="md"
          className="absolute top-[31%] left-1/2 h-[7rem] w-[7.75rem] -translate-x-1/2 object-contain"
        />

        <div className="absolute top-[56%] right-3 left-3">{children}</div>
      </div>
    </main>
  );
}
