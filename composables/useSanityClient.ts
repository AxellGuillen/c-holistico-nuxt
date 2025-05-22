import { getFileAsset } from "@sanity/asset-utils";

export function useFileUrl() {
  const sanity = useSanity();

  return (ref: string) => {
    const asset = getFileAsset(
      { _ref: ref, _type: "reference" },
      sanity.config
    );
    return asset.url;
  };
}
