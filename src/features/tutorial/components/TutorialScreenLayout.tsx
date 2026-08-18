import { clsx } from "clsx";
import type { ReactNode } from "react";

type TutorialScreenLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function TutorialScreenLayout({
  children,
  className,
}: TutorialScreenLayoutProps) {
  return (
    <main className="mobile-screen relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat"
      />

      <div
        className={clsx(
          "relative mx-auto h-full w-full max-w-[29rem]",
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}
