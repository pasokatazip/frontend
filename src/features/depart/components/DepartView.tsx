import Image from "next/image";
import type { ReactNode } from "react";
import { GetItemBubble } from "@/components/ui/bubble/GetItemBubble";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";

export type DepartStep = "Convey" | "Message" | "LastSouvenirs" | "NextSetup";

type DepartViewProps = {
    onNext: () => void;
    step: DepartStep;
    name: string;
};

type ScreenProps = {
    onNext: () => void;
};

type DepartScreenProps = {
    background: "home" | "setting";
    children: ReactNode;
};

function DepartScreen({ background, children }: DepartScreenProps) {
    const backgroundClassName =
        background === "home"
            ? "bg-[url('/images/home/background.png')] bg-center"
            : "bg-[url('/images/background.png')] bg-[position:center_top] bg-no-repeat";

    return (
        <main
            className={`mobile-screen relative overflow-hidden bg-cover ${backgroundClassName}`}
        >
            {children}
        </main>
    );
}

function Convey({ name, onNext }: ScreenProps & { name: string }) {
    return (
        <DepartScreen background="home">
            <div className="relative min-h-[100dvh]">
                <button
                    aria-label="つぎのメッセージへ"
                    className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
                    onClick={onNext}
                    type="button"
                />
                <Image
                    src="/images/home/effect.png"
                    alt=""
                    width={1125}
                    height={1143}
                    className="mobile-safe-bottom-0 pointer-events-none fixed left-0 max-w-fit"
                />
                <Image
                    src="/images/home/pet.png"
                    alt="YO-YO"
                    width={360}
                    height={360}
                    className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 object-contain"
                />
                <TopMessagePanel className="relative z-20 pointer-events-none">
                    {name}は、あなたに
                    <br />
                    伝えたいことがあるようです
                </TopMessagePanel>
            </div>
        </DepartScreen>
    );
}

function Message({ onNext }: ScreenProps) {
    return (
        <DepartScreen background="setting">
            <button
                aria-label="おみやげを確認する"
                className="flex min-h-dvh w-full cursor-pointer flex-col items-center justify-center px-8 text-center"
                onClick={onNext}
                type="button"
            >
                <Image
                    src="/images/home/pet.png"
                    alt="YO-YO"
                    width={360}
                    height={360}
                    className="h-40 w-40 object-contain"
                />
                <p className="text-lg text-teal-500 leading-6 [text-shadow:0px_0px_4px_rgb(0_0_0/0.25)]">
                    しあわせに なるYO...
                </p>
            </button>
        </DepartScreen>
    );
}

function LastSouvenirs({ onNext }: ScreenProps) {
    return (
        <DepartScreen background="setting">
            <button
                aria-label="旅立ちの案内へ進む"
                onClick={onNext}
                className="flex min-h-[100dvh] w-full items-center justify-center border-0 bg-transparent p-0"
                type="button"
            >
                <GetItemBubble
                    className="w-[min(100%,25.5rem)]"
                    souvenirs={[
                        {
                            image: "/images/souvenir/secret.png",
                            name: "最後のおみやげ",
                        },
                    ]}
                    text="最後におみやげを置いていったようです"
                />
            </button>
        </DepartScreen>
    );
}

function NextSetup({ onNext }: ScreenProps) {
    return (
        <DepartScreen background="setting">
            <div className="relative min-h-[100dvh]">
                <button
                    aria-label="セットアップへ進む"
                    className="mobile-safe-bottom-0 absolute left-1/2 cursor-pointer border-0 bg-transparent p-0 -translate-x-1/2"
                    onClick={onNext}
                    type="button"
                >
                    <Image
                        src="/images/depart/bye.png"
                        alt="旅立つYO-YO"
                        width={141}
                        height={171}
                        className="h-auto w-[8.8125rem]"
                    />
                </button>
            </div>
        </DepartScreen>
    );
}

export function DepartView({ name, onNext, step }: DepartViewProps) {
    switch (step) {
        case "Convey":
            return <Convey name={name} onNext={onNext} />;
        case "Message":
            return <Message onNext={onNext} />;
        case "LastSouvenirs":
            return <LastSouvenirs onNext={onNext} />;
        case "NextSetup":
            return <NextSetup onNext={onNext} />;
    }
}
