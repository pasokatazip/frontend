import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#D2ECFF",
    description: "つぶやきを聞いて成長するペット",
    display: "standalone",
    icons: [
      {
        purpose: "any",
        sizes: "192x192",
        src: "/pwa/icon-192.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/pwa/icon-512.png",
        type: "image/png",
      },
    ],
    name: "PET YO-YO",
    short_name: "YO-YO",
    start_url: "/Home",
    theme_color: "#D2ECFF",
  };
}
