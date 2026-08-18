export function getPetFrameUrls({
  folderName,
  frameCount,
}: {
  folderName: string;
  frameCount: number;
}) {
  const imageBaseUrl = process.env.PETYOYO_IMAGE_URL ?? "";
  const imageVersion = process.env.PETYOYO_IMAGE_VERSION ?? "";

  return Array.from({ length: frameCount }, (_, index) => {
    const frameNumber = index + 1;
    const path = `/assets/${folderName}/${folderName}${frameNumber}.webp`;
    const url = new URL(path, imageBaseUrl || "http://localhost");

    if (imageVersion) {
      url.searchParams.set("v", imageVersion);
    }

    return imageBaseUrl ? url.toString() : `${path}${url.search}`;
  });
}
