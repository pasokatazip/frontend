const babyPetFrameCount = 12;

export function getBabyPetFrameUrls(imageBaseUrl: string) {
  return Array.from({ length: babyPetFrameCount }, (_, index) => {
    const frameNumber = index + 1;
    const path = `/assets/babypet/babypet${frameNumber}.png`;

    return imageBaseUrl ? new URL(path, imageBaseUrl).toString() : path;
  });
}
