export const useNavigation = () => {
  const links = [
    { label: "Raíces", path: "/" },
    { label: "Nuestra Esencia", path: "/about" },
    { label: "Rituales & Terapias", path: "/servicios" },
    { label: "Viajes ", path: "/Viajes" },
  ];

  return { links };
};
