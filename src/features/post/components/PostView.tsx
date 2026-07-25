import { PetComposerLayout } from "@/components/layout/PetComposerLayout";
import { RoundButton } from "@/components/ui/button/RoundButton";
import { PostComposer } from "@/components/ui/form/PostComposer";
import { PetSnapshot } from "@/types/pet";

type PostViewProps = {
  message: string;
  submitError?: string;

  onHome: () => void;
  onMessageChange: (message: string) => void;
  onSubmit?: (message: string) => void;

  pet: PetSnapshot;
};

export function PostView({
  message,
  submitError,
  onHome,
  onMessageChange,
  onSubmit,
  pet,
}: PostViewProps) {
  return (
    <PetComposerLayout pet={pet}>
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
