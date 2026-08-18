import { PetComposerLayout } from "@/components/layout/PetComposerLayout";
import { PostComposer } from "@/components/ui/form/PostComposer";
import { PetSnapshot } from "@/types/pet";

type TutorialPostViewProps = {
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: (message: string) => void;
  pet: PetSnapshot;
  submitError?: string;
};

export function TutorialPostView({
  message,
  onMessageChange,
  onSubmit,
  pet,
  submitError,
}: TutorialPostViewProps) {
  return (
    <PetComposerLayout pet={pet}>
      <PostComposer
        onSubmit={onSubmit}
        onValueChange={onMessageChange}
        value={message}
      />
      <p
        aria-live="polite"
        className="mt-2 min-h-4 text-center text-xs text-red-600"
      >
        {submitError}
      </p>
    </PetComposerLayout>
  );
}
