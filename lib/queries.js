export const query = groq`
  *[_type == "home"][0]{
    title,
    blocks[] {
      _key,
      _type,
      id,
      title,
      subtitle,

      // === Media ===
      "backgroundImage": backgroundImage.asset->{
        url,
        "alt": coalesce(^.alt, asset->altText)
      },
      "backgroundVideo": backgroundVideo.asset->{
        url
      },

      // === monthServiceBlock ===
      _type == "monthServiceBlock" => {
        description[],
        price,
        date,
        ctaLabel,
        "image": image.asset->{
          url,
          "alt": coalesce(^.alt, asset->altText)
        },
        "video": video.asset->{
          url,
          mimeType
        }
      },

      // === servicesBlock ===
      _type == "servicesBlock" => {
        title,
        categories[] {
          _key,
          _type,
          title,
          subtitle,
          ctaText,
          ctaLink,
          "slug": slug.current,
          "backgroundImage": backgroundImage.asset->{
            url,
            "alt": coalesce(^.alt, asset->altText)
          }
        }
      }
    }
  }
`;
