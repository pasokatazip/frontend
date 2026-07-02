import type { StaticImageData } from "next/image";
import { PetComposerLayout } from "@/components/layout/PetComposerLayout";
import { PostComposer } from "@/components/ui/form/PostComposer";

type TutorialPostViewProps = {
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit?: (message: string) => void;
  petImage: StaticImageData;
};

export function TutorialPostView({
  message,
  onMessageChange,
  onSubmit,
  petImage,
}: TutorialPostViewProps) {
  return (
    <PetComposerLayout petImage={petImage}>
      <PostComposer
        onSubmit={onSubmit}
        onValueChange={onMessageChange}
        value={message}
      />
    </PetComposerLayout>
  );
}
