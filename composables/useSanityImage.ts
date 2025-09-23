import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";

export function useSanityImage() {
  const sanity = useSanity();
  const builder = imageUrlBuilder(sanity.client);

  const urlFor = (source: Image) => {
    if (!source?._ref) return "";
    return builder.image(source).format("webp").url(); // ⚠️ <--- .url() convierte a string
  };

  const urlForPlaceholder = (source: Image) => {
    if (!source?._ref) return "";
    return builder
      .image(source)
      .width(500)
      .quality(100)
      .blur(250)
      .format("webp")
      .url(); // ⚠️ <--- .url() convierte a string
  };

  return { urlFor, urlForPlaceholder };
}
