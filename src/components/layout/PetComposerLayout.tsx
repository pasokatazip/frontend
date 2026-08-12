import type { ReactNode } from "react";
import { GetMyPet } from "../ui/pet/GetMyPet";
import { PetSnapshot } from "@/types/pet";

type PetComposerLayoutProps = {
  children: ReactNode;
  pet: PetSnapshot;
};

export function PetComposerLayout({ children, pet }: PetComposerLayoutProps) {
  return (
    <main className="relative h-full overflow-hidden bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative mx-auto h-full w-full max-w-[29rem]">
        <GetMyPet
          pet={pet}
          size="md"
          className="absolute top-[31%] left-1/2 h-[7rem] w-[7.75rem] -translate-x-1/2 object-contain"
        />

        <div className="absolute top-[56%] right-3 left-3">{children}</div>
      </div>
    </main>
  );
}
