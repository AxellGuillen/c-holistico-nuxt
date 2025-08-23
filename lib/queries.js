export const backGround = groq`
  *[_type == "background"] {
    _id,
    name,
    imagen,
    descripcion
  }
`;

export const queryPrenda = groq`
  *[_type == "prenda"] {
    _id,
    nombre,
    categoria,
    posicionInicial,
    imagen {
      asset -> {
        url
      }
    }
  }
`;
