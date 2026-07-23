export type MovementBounds = {
  maximumX: number;
  maximumY: number;
  minimumDistance: number;
};

export type PetMotion = {
  facing: 1 | -1;
  id: string;
  nextDirectionChange: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

export type PetPosition = Pick<PetMotion, "id" | "x" | "y">;

const collisionDistanceRatio = 0.5;
const minimumSpeed = 28;
const speedRange = 18;
const minimumDirectionDuration = 2_500;
const directionDurationRange = 2_500;
// ここの固定値は重ならないようにするための値で、後からランダムスポーンなどで変更する
const initialPositions = [
  { x: 0.5, y: 1 },
  { x: 0.12, y: 0.25 },
  { x: 0.82, y: 0.4 },
  { x: 0.28, y: 0.68 },
];

const groupedPetCells = [0, 1, 2, 3];
const groupedPetCellHeight = 116;
const groupedPetCellWidth = 132;
const groupedPetHeight = 112;
const groupedPetWidth = 128;

function randomBetween(minimum: number, maximum: number) {
  return minimum + Math.random() * (maximum - minimum);
}

function shuffle(values: number[]) {
  const shuffledValues = [...values];

  for (let index = shuffledValues.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledValues[index], shuffledValues[randomIndex]] = [
      shuffledValues[randomIndex],
      shuffledValues[index],
    ];
  }

  return shuffledValues;
}

export function createGroupedPetPositions(petIds: string[]) {
  const cells = shuffle(groupedPetCells);

  return petIds.slice(0, cells.length).map((id, index) => {
    const cell = cells[index];
    const column = cell % 2;
    const row = Math.floor(cell / 2);

    return {
      id,
      x:
        column * groupedPetCellWidth +
        randomBetween(0, groupedPetCellWidth - groupedPetWidth),
      y:
        row * groupedPetCellHeight +
        randomBetween(0, groupedPetCellHeight - groupedPetHeight),
    } satisfies PetPosition;
  });
}

function createVelocity() {
  const angle = randomBetween(0, Math.PI * 2);
  const speed = randomBetween(minimumSpeed, minimumSpeed + speedRange);

  return {
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
  };
}

function getNextDirectionChange(now: number) {
  return (
    now +
    randomBetween(
      minimumDirectionDuration,
      minimumDirectionDuration + directionDurationRange,
    )
  );
}

function keepInsideBounds(motion: PetMotion, bounds: MovementBounds) {
  if (motion.x <= 0 || motion.x >= bounds.maximumX) {
    motion.x = Math.min(Math.max(motion.x, 0), bounds.maximumX);
    motion.velocityX *= -1;
  }

  if (motion.y <= 0 || motion.y >= bounds.maximumY) {
    motion.y = Math.min(Math.max(motion.y, 0), bounds.maximumY);
    motion.velocityY *= -1;
  }
}

function separateCollidingPets(
  motions: PetMotion[],
  bounds: MovementBounds,
  pausedPetIds: ReadonlySet<string> = new Set(),
) {
  for (let firstIndex = 0; firstIndex < motions.length; firstIndex += 1) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < motions.length;
      secondIndex += 1
    ) {
      const first = motions[firstIndex];
      const second = motions[secondIndex];
      const differenceX = second.x - first.x;
      const differenceY = second.y - first.y;
      const distance = Math.hypot(differenceX, differenceY);

      if (distance >= bounds.minimumDistance) {
        continue;
      }

      const normalX = distance === 0 ? 1 : differenceX / distance;
      const normalY = distance === 0 ? 0 : differenceY / distance;
      const overlap = bounds.minimumDistance - distance;
      const firstSpeed = Math.hypot(first.velocityX, first.velocityY);
      const secondSpeed = Math.hypot(second.velocityX, second.velocityY);
      const firstIsPaused = pausedPetIds.has(first.id);
      const secondIsPaused = pausedPetIds.has(second.id);

      if (firstIsPaused && secondIsPaused) {
        continue;
      }

      if (firstIsPaused) {
        second.x += normalX * overlap;
        second.y += normalY * overlap;
        second.velocityX = normalX * secondSpeed;
        second.velocityY = normalY * secondSpeed;
        second.facing = second.velocityX < 0 ? -1 : 1;
        keepInsideBounds(second, bounds);
        continue;
      }

      if (secondIsPaused) {
        first.x -= normalX * overlap;
        first.y -= normalY * overlap;
        first.velocityX = -normalX * firstSpeed;
        first.velocityY = -normalY * firstSpeed;
        first.facing = first.velocityX < 0 ? -1 : 1;
        keepInsideBounds(first, bounds);
        continue;
      }

      const correction = overlap / 2;

      first.x -= normalX * correction;
      first.y -= normalY * correction;
      second.x += normalX * correction;
      second.y += normalY * correction;
      first.velocityX = -normalX * firstSpeed;
      first.velocityY = -normalY * firstSpeed;
      second.velocityX = normalX * secondSpeed;
      second.velocityY = normalY * secondSpeed;
      first.facing = first.velocityX < 0 ? -1 : 1;
      second.facing = second.velocityX < 0 ? -1 : 1;
      keepInsideBounds(first, bounds);
      keepInsideBounds(second, bounds);
    }
  }
}

export function createMovementBounds({
  fieldHeight,
  fieldWidth,
  petHeight,
  petWidth,
}: {
  fieldHeight: number;
  fieldWidth: number;
  petHeight: number;
  petWidth: number;
}) {
  return {
    maximumX: Math.max(fieldWidth - petWidth, 0),
    maximumY: Math.max(fieldHeight - petHeight, 0),
    minimumDistance: Math.max(petWidth, petHeight) * collisionDistanceRatio,
  } satisfies MovementBounds;
}

export function createInitialPetMotions(
  petIds: string[],
  bounds: MovementBounds,
  now: number,
  startingPositions: PetPosition[] = [],
) {
  const motions = petIds.map((id, index) => {
    const initialPosition = initialPositions[index] ?? { x: 0.5, y: 0.5 };
    const startingPosition = startingPositions.find(
      (position) => position.id === id,
    );
    const velocity = createVelocity();

    return {
      facing: velocity.velocityX < 0 ? -1 : 1,
      id,
      nextDirectionChange: getNextDirectionChange(now),
      ...velocity,
      x: startingPosition?.x ?? bounds.maximumX * initialPosition.x,
      y: startingPosition?.y ?? bounds.maximumY * initialPosition.y,
    } satisfies PetMotion;
  });

  separateCollidingPets(motions, bounds);
  return motions;
}

export function keepPetMotionsInsideBounds(
  motions: PetMotion[],
  bounds: MovementBounds,
) {
  return motions.map((motion) => {
    const nextMotion = { ...motion };

    keepInsideBounds(nextMotion, bounds);
    return nextMotion;
  });
}

export function updatePetMotions(
  motions: PetMotion[],
  bounds: MovementBounds,
  now: number,
  elapsedSeconds: number,
  pausedPetIds: ReadonlySet<string> = new Set(),
) {
  const nextMotions = motions.map((motion) => {
    const nextMotion = { ...motion };

    if (pausedPetIds.has(nextMotion.id)) {
      return nextMotion;
    }

    if (now >= nextMotion.nextDirectionChange) {
      Object.assign(nextMotion, createVelocity());
      nextMotion.nextDirectionChange = getNextDirectionChange(now);
    }

    nextMotion.x += nextMotion.velocityX * elapsedSeconds;
    nextMotion.y += nextMotion.velocityY * elapsedSeconds;
    nextMotion.facing = nextMotion.velocityX < 0 ? -1 : 1;
    keepInsideBounds(nextMotion, bounds);
    return nextMotion;
  });

  separateCollidingPets(nextMotions, bounds, pausedPetIds);
  return nextMotions;
}
