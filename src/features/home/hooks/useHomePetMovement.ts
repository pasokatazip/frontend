import { useEffect, useRef, useState } from "react";
import {
  createInitialPetMotions,
  createMovementBounds,
  keepPetMotionsInsideBounds,
  updatePetMotions,
  type MovementBounds,
  type PetMotion,
  type PetPosition,
} from "@/features/home/utils/petMovement";

const movementInterval = 100;
const movementSeconds = movementInterval / 1_000;
const noPausedPetIds = new Set<string>();

type InitialPositionArea = {
  height: number;
  positions: PetPosition[];
  width: number;
};

type HomePetMovementOptions = {
  enabled?: boolean;
  initialPositionArea?: InitialPositionArea;
  pausedPetIds?: ReadonlySet<string>;
};

export function useHomePetMovement(
  petIds: string[],
  {
    enabled = true,
    initialPositionArea,
    pausedPetIds = noPausedPetIds,
  }: HomePetMovementOptions = {},
) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLButtonElement>(null);
  const boundsRef = useRef<MovementBounds | null>(null);
  const pausedPetIdsRef = useRef(pausedPetIds);
  const timerRef = useRef<number | null>(null);
  const [motions, setMotions] = useState<PetMotion[]>([]);

  pausedPetIdsRef.current = pausedPetIds;

  useEffect(() => {
    if (!enabled && !initialPositionArea) {
      setMotions([]);
      return;
    }

    if (initialPositionArea?.positions.length === 0) {
      setMotions([]);
      return;
    }

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
            pausedPetIdsRef.current,
          ),
        );
      }
    }

    function syncMovement() {
      stopMovement();

      if (enabled && !document.hidden && !reducedMotion.matches) {
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

    const startingPositions = initialPositionArea
      ? initialPositionArea.positions.map((position) => ({
          ...position,
          x:
            (fieldElement.clientWidth - initialPositionArea.width) / 2 +
            position.x,
          y:
            (fieldElement.clientHeight - initialPositionArea.height) / 2 +
            position.y,
        }))
      : [];

    setMotions(
      createInitialPetMotions(petIds, bounds, Date.now(), startingPositions),
    );

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
  }, [enabled, initialPositionArea, petIds]);

  return { fieldRef, motions, petRef };
}
