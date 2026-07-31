import { clsx } from "clsx";
import Image from "next/image";
import type { HTMLAttributes, ReactNode } from "react";

type TopMessagePanelProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export function TopMessagePanel({
    children,
    className,
    style,
    ...props
}: TopMessagePanelProps) {
    return (
        <div
            className={clsx(
                "relative h-[15rem] w-full overflow-hidden",
                className,
            )}
            style={style}
            {...props}
        >
            <Image
                src="/images/vector.png"
                alt=""
                width={1128}
                height={630}
                priority
                className="pointer-events-none absolute top-0 left-1/2 h-[15rem] w-[calc(100%+0.25rem)] max-w-none -translate-x-1/2 object-fill"
            />

            <p className="absolute top-[8.5rem] right-0 left-0 text-center text-base leading-6 font-normal tracking-normal text-[#4C4F5E] [text-shadow:0px_0px_4px_rgb(255_255_255/1.00)]">
                {children}
            </p>
        </div>
    );
}
