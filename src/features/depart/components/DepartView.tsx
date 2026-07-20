import Image from "next/image";
import { TopMessagePanel } from "@/components/ui/panel/TopMessagePanel";

type DepartViewProps = {
    effectImage: {
        height: number;
        src: string;
        width: number;
    };
    name: string;
};

export function DepartView({ effectImage, name }: DepartViewProps) {
    return (
        <>
            <main className="mobile-screen bg-[url('/images/home/background.png')] bg-cover bg-center">
                <Image
                    src={effectImage.src}
                    alt=""
                    width={effectImage.width}
                    height={effectImage.height}
                    className="mobile-safe-bottom-0 fixed left-0 max-w-fit"
                />
                <TopMessagePanel>
                    {name}は、あなたに
                    <br />
                    伝えたいことがあるようです
                </TopMessagePanel>
            </main>
        </>
    );
}
