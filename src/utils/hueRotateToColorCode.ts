type RgbColor = {
  blue: number;
  green: number;
  red: number;
};

const basePetBodyColor: RgbColor = {
  blue: 200,
  green: 181,
  red: 249,
};

function clampColorValue(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function colorValueToHex(value: number) {
  return clampColorValue(value).toString(16).padStart(2, "0").toUpperCase();
}

export function hueRotateToColorCode(hueRotate: number) {
  const angle = (hueRotate * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const { blue, green, red } = basePetBodyColor;

  const rotatedRed =
    (0.213 + 0.787 * cos - 0.213 * sin) * red +
    (0.715 - 0.715 * cos - 0.715 * sin) * green +
    (0.072 - 0.072 * cos + 0.928 * sin) * blue;
  const rotatedGreen =
    (0.213 - 0.213 * cos + 0.143 * sin) * red +
    (0.715 + 0.285 * cos + 0.14 * sin) * green +
    (0.072 - 0.072 * cos - 0.283 * sin) * blue;
  const rotatedBlue =
    (0.213 - 0.213 * cos - 0.787 * sin) * red +
    (0.715 - 0.715 * cos + 0.715 * sin) * green +
    (0.072 + 0.928 * cos + 0.072 * sin) * blue;

  return `#${colorValueToHex(rotatedRed)}${colorValueToHex(
    rotatedGreen,
  )}${colorValueToHex(rotatedBlue)}`;
}
