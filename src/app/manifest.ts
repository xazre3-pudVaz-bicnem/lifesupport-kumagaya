import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nameWithService,
    short_name: site.name,
    description: "熊谷市を中心に、深谷市・行田市・東松山市で買い物代行を行う地域密着型サービス。",
    start_url: "/",
    display: "standalone",
    lang: "ja",
    background_color: "#fbfaf6",
    theme_color: "#8cc63f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
