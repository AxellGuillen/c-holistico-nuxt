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
        slug,
        ctaLabel,
        "backgroundImage": backgroundImage.asset->{
          url,
          "alt": coalesce(^.alt, asset->altText)
        },
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
      },
      
      // === carouselBlock ===
      _type == "carouselBlock" => {
        title,
        pauseOnHover,
        images[] {
          _key,
          caption,
          aspectRatio,
          "alt": coalesce(^.alt, asset->altText),
          "url": asset->url
        }
      }, 
      
      // === quizBlock ===
      _type == "quizBlock" => {
        sectionId,
        backgroundColor,
        paddingTop,
        paddingBottom,
        showCategoryIndicators,
        enableAnimations,
        quizConfig->{
          _id,
          title,
          isActive
        }
      },
      // === footerBlock ===
      _type == "footerBlock" => {
        studioAddress,
        schedule,
        email,
        seasonalMessage,
        "bottomSvg": bottomSvg.asset->{
          url,
          "alt": coalesce(^.alt, asset->altText)
        },
        socials {
          instagram {
            url,  
            "icon": icon.asset->{
              url,
              "alt": coalesce(^.alt, asset->altText)
            }
          },
          facebook {
            url,
            "icon": icon.asset->{
              url,
              "alt": coalesce(^.alt, asset->altText)
            }
          }
        }
      },
      // === therapistBlock ===
      _type == "therapistBlock" => {
      therapists[]-> {
        title,
        subtitle,
        _id,
        name,
        shortBio,
        service,
        "imageUrl": image.asset->url,
        slug
      }
      }
    }
  }
`;
