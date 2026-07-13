import { getBabyPetFrameUrls } from "../utils/getBabyPetFrameUrls";

export const babyPetFrameUrls = getBabyPetFrameUrls(
  process.env.PETYOYO_IMAGE_URL ?? "",
);
