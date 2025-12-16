export const aboutQuery = groq`
  *[_type == "about"][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    aboutStatement,
    practiceHighlights[] {
      _key,
      _type,
      title,
      value
    },
    stats[] {
      _key,
      _type,
      title,
      value
    }
  }
`;
