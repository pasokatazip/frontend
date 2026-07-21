import type { StaticImageData } from "next/image";
import { PetComposerLayout } from "@/components/layout/PetComposerLayout";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { PostComposer } from "@/components/ui/form/PostComposer";

type PostViewProps = {
  message: string;
  submitError?: string;

  onHome: () => void;
  onMessageChange: (message: string) => void;
  onSubmit?: (message: string) => void;

  petImage: StaticImageData;
};

export function PostView({
  message,
  submitError,
  onHome,
  onMessageChange,
  onSubmit,
  petImage,
}: PostViewProps) {
  return (
    <PetComposerLayout petImage={petImage}>
      <PostComposer
        value={message}
        onValueChange={onMessageChange}
        onSubmit={onSubmit}
      />

      <p className="min-h-4 text-center text-xs text-red-600">{submitError}</p>
      <div className="fixed bottom-[calc(0.25rem+var(--safe-area-bottom))] left-4">
        <RoundButton
          image="/icons/home.svg"
          label="ホームへ"
          onClick={onHome}
        />
      </div>
    </PetComposerLayout>
  );
}
