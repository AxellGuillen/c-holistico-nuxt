export const homeQuery = groq`
*[_type == "home"][0]{
  _id,
  title,
  headline,
  description,
  cta{
    label,
    url
  },
  videoFile{
    asset->{
      url,
      mimeType
    }
  },
  poster{
    asset->{
      url
    }
  }
}
`;
