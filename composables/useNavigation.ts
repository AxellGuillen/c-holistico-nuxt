export const useNavigation = () => {
  const links = [
    { label: "Inicio", path: "/hero" },
    { label: "Nuestra Esencia", path: "/about" },
    { label: "Rituales & Terapias", path: "/therapies" },
    { label: "Historias ", path: "/testimonials" },
  ];

  return { links };
};
