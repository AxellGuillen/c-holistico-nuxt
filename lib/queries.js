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
      // === heroBlock ===
      _type == "heroBlock" => {
        _key,
        _type,
        id,
        title,
        subtitle,
        textAlignment,

        // CTA
        cta {
          text,
          link,
          style
        },

        // Background image
        "backgroundImage": backgroundImage.asset->{
          url,
          "alt": coalesce(^.alt, asset->altText)
        },

        // Background video
        "backgroundVideo": backgroundVideo.asset->{
          url
        }
      },
      // === servicesBlock ===
      _type == "servicesBlock" => {
          _key,
          _type,
          title,
          subtitle,
          services[]->{
            _id,
            name,
            slug,
            shortDescription,
            thumbnail{
              "asset": {
                "_ref": asset._ref,        // ← El _ref sin dereferenciar
                "url": asset->url         // ← La URL dereferenciada (fallback)
              },
              alt
            },
            durations[isDefault == true][0]{
              minutes,
              price
            }
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
      // === testimonialBlock ===
      _type == "testimonialBlock" => {
        _key,
        _type,
        id,
        autoplayInterval,
        showGoogleBadge,
        testimonials[]{
          _key,
          quote,
          author,
          rating
        }
      },
    // === ctaBlock ===
      _type == "ctaBlock" => {
          _id,
          title,
          subtitleOne,
          subtitleTwo,
          images[]{
            _key,
            alt,
            asset->{
              _id,
              url,
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
