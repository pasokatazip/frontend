import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";
import { shadows } from "@/components/layout/shadowLayout";

export type GetItemBubbleSouvenir = {
    image: StaticImageData | string;
    name: string;
};

type GetItemBubbleProps = {
    text: string;
    souvenirs: readonly GetItemBubbleSouvenir[];
    className?: string;
};

export function GetItemBubble({
    className,
    souvenirs,
    text,
}: GetItemBubbleProps) {
    const visibleSouvenirs = souvenirs.slice(0, 3);
    const souvenirImageClassName =
        visibleSouvenirs.length === 1 ? "h-28 w-28" : "h-20 w-20";

    return (
        <section
            aria-label="おみやげを獲得"
            className={clsx(
                "relative aspect-square w-full max-w-[25.5rem]",
                className,
            )}
        >
            <Image
                src="/images/getBubble.png"
                alt=""
                fill
                sizes="(max-width: 408px) 100vw, 408px"
                className="pointer-events-none object-contain"
            />

            <div className="relative z-10 flex h-full flex-col gap-2 items-center justify-center px-[16%] text-center">
                <p
                    className="text-zinc-600 text-base leading-6"
                    style={{ textShadow: shadows.dropwhite }}
                >
                    {text}
                </p>
                <div className="flex w-full items-start justify-center gap-2">
                    {visibleSouvenirs.map((souvenir, index) => (
                        <div
                            className="flex min-w-0 flex-1 flex-col items-center gap-1"
                            key={`${souvenir.name}-${index}`}
                        >
                            <Image
                                src={souvenir.image}
                                alt={souvenir.name}
                                width={112}
                                height={112}
                                className={`${souvenirImageClassName} shrink-0 object-contain`}
                                unoptimized
                            />
                            <p
                                className="w-full truncate text-center text-[10px] leading-4 text-zinc-600"
                                style={{ textShadow: shadows.dropwhiteLarge }}
                            >
                                {souvenir.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
