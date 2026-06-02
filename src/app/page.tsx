import { PixiStage } from "@/components/PixiStage";

export default function Home() {
  return (
    <main className="page-shell bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="page-container flex flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Next.js App Router / Pixi.js / Tailwind CSS / Storybook / oxlint
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Frontend template
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            A minimal App Router setup with a Pixi.js client component,
            Tailwind CSS styling, Storybook stories, and oxlint scripts.
          </p>
        </header>

        <PixiStage />
      </div>
    </main>
  );
}
