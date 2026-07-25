import { PetComposerLayout } from "@/components/layout/PetComposerLayout";
import { PostComposer } from "@/components/ui/form/PostComposer";
import { PetSnapshot } from "@/types/pet";

type TutorialPostViewProps = {
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit?: (message: string) => void;
  pet: PetSnapshot;
};

export function TutorialPostView({
  message,
  onMessageChange,
  onSubmit,
  pet,
}: TutorialPostViewProps) {
  return (
    <PetComposerLayout pet={pet}>
      <PostComposer
        onSubmit={onSubmit}
        onValueChange={onMessageChange}
        value={message}
      />
    </PetComposerLayout>
  );
}
