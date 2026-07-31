import { hueRotateToColorCode } from "./hueRotateToColorCode";

function normalizeColorCode(colorCode: string) {
  const normalizedColorCode = colorCode.trim().toUpperCase();

  return normalizedColorCode.startsWith("#")
    ? normalizedColorCode
    : `#${normalizedColorCode}`;
}

function hexToRgb(colorCode: string) {
  const normalizedColorCode = normalizeColorCode(colorCode);
  const match = /^#([0-9A-F]{6})$/.exec(normalizedColorCode);

  if (!match) {
    return;
  }

  const value = match[1];

  return {
    red: Number.parseInt(value.slice(0, 2), 16),
    green: Number.parseInt(value.slice(2, 4), 16),
    blue: Number.parseInt(value.slice(4, 6), 16),
  };
}

function colorDistance(
  firstColor: NonNullable<ReturnType<typeof hexToRgb>>,
  secondColor: NonNullable<ReturnType<typeof hexToRgb>>,
) {
  return (
    (firstColor.red - secondColor.red) ** 2 +
    (firstColor.green - secondColor.green) ** 2 +
    (firstColor.blue - secondColor.blue) ** 2
  );
}

export function colorCodeToHueRotate(colorCode: string) {
  const targetColor = hexToRgb(colorCode);

  if (!targetColor) {
    return 0;
  }

  let closestHueRotate = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let hueRotate = 0; hueRotate < 360; hueRotate += 1) {
    const currentColor = hexToRgb(hueRotateToColorCode(hueRotate));

    if (!currentColor) {
      continue;
    }

    const currentDistance = colorDistance(targetColor, currentColor);

    if (currentDistance < closestDistance) {
      closestDistance = currentDistance;
      closestHueRotate = hueRotate;
    }
  }

  return closestHueRotate;
}
