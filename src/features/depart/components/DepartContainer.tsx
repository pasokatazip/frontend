"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DepartView, type DepartStep } from "./DepartView";

export type DepartPet = {
    name: string;
    imageSrc: string;
};

type DepartContainerProps = {
    pet?: DepartPet;
};

const nextSteps: Record<Exclude<DepartStep, "NextSetup">, DepartStep> = {
    Convey: "Message",
    Message: "LastSouvenirs",
    LastSouvenirs: "NextSetup",
};

const defaultPet: DepartPet = {
    name: "YoYo",
    imageSrc: "/images/home/pet.png",
};

export function DepartContainer({ pet = defaultPet }: DepartContainerProps) {
    const router = useRouter();
    const [step, setStep] = useState<DepartStep>("Convey");

    function handleNext() {
        if (step === "NextSetup") {
            router.push("/setup");
            return;
        }

        setStep(nextSteps[step]);
    }

    return (
        <DepartView
            name={pet.name}
            onNext={handleNext}
            petImageSrc={pet.imageSrc}
            step={step}
        />
    );
}
