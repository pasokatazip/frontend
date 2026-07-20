"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DepartView, type DepartStep } from "./DepartView";

const nextSteps: Record<Exclude<DepartStep, "NextSetup">, DepartStep> = {
    Convey: "Message",
    Message: "LastSouvenirs",
    LastSouvenirs: "NextSetup",
};

export function DepartContainer() {
    const router = useRouter();
    const [step, setStep] = useState<DepartStep>("Convey");
    const name = "YoYo";

    function handleNext() {
        if (step === "NextSetup") {
            router.push("/setup");
            return;
        }

        setStep(nextSteps[step]);
    }

    return <DepartView name={name} onNext={handleNext} step={step} />;
}
