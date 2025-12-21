export const CATEGORIES_QUERY = groq`
*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug {
    current
  },
  identifier,
  tagline,
  color {
    hex
  }
}
`;

export const SERVICES_QUERY = groq`
  *[_type == "subservice" && isActive == true] 
  | order(matchCriteria.priorityLevel desc) {
    _id,
    name,
    slug {
      current
    },
    shortDescription,
    thumbnail {
      asset-> {
        url
      }
    },
    durations[] {
      minutes,
      price,
      isDefault
    },
    currency,
    category-> {
      _id,
      name,
      slug {
        current
      }
    }
  }
`;

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "subservice" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    slug,
    shortDescription,
    idealFor,
    thumbnail {
      asset-> {
        url
      },
    },
    gallery[] {
      asset-> {
        url
      }
    },
    durations[] {
      minutes,
      price,
      isDefault
    },
    currency,
    category-> {
      _id,
      name,
      slug
    }
  }
`;
