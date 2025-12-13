export const useNavigation = () => {
  const links = [
    { label: "Raíces", path: "/" },
    { label: "Nuestra Esencia", path: "/about" },
    { label: "Servicios", path: "/servicios" },
    { label: "Viajes ", path: "/Viajes" },
  ];

  return { links };
};
