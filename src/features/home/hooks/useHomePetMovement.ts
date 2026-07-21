import { useEffect, useRef, useState } from "react";
import {
  createInitialPetMotions,
  createMovementBounds,
  keepPetMotionsInsideBounds,
  updatePetMotions,
  type MovementBounds,
  type PetMotion,
} from "@/features/home/utils/petMovement";

const movementInterval = 100;
const movementSeconds = movementInterval / 1_000;

export function useHomePetMovement(petIds: string[]) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<MovementBounds | null>(null);
  const timerRef = useRef<number | null>(null);
  const [motions, setMotions] = useState<PetMotion[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const petElement = petRef.current;

    if (!field || !petElement) {
      return;
    }

    const fieldElement = field;
    const measuredPetElement = petElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function stopMovement() {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    function movePets() {
      const bounds = boundsRef.current;

      if (bounds) {
        setMotions((currentMotions) =>
          updatePetMotions(
            currentMotions,
            bounds,
            Date.now(),
            movementSeconds,
          ),
        );
      }
    }

    function syncMovement() {
      stopMovement();

      if (!document.hidden && !reducedMotion.matches) {
        timerRef.current = window.setInterval(movePets, movementInterval);
      }
    }

    function updateBounds() {
      const bounds = createMovementBounds({
        fieldHeight: fieldElement.clientHeight,
        fieldWidth: fieldElement.clientWidth,
        petHeight: measuredPetElement.offsetHeight,
        petWidth: measuredPetElement.offsetWidth,
      });

      boundsRef.current = bounds;
      setMotions((currentMotions) =>
        keepPetMotionsInsideBounds(currentMotions, bounds),
      );
      return bounds;
    }

    const bounds = updateBounds();

    setMotions(createInitialPetMotions(petIds, bounds, Date.now()));

    const resizeObserver = new ResizeObserver(updateBounds);

    resizeObserver.observe(fieldElement);
    document.addEventListener("visibilitychange", syncMovement);
    reducedMotion.addEventListener("change", syncMovement);
    syncMovement();

    return () => {
      stopMovement();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncMovement);
      reducedMotion.removeEventListener("change", syncMovement);
    };
  }, [petIds]);

  return { fieldRef, motions, petRef };
}
