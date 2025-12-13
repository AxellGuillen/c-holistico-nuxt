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
    duration,
    price,
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
