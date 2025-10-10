<script setup>
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute(); // Accedemos
let isHome = route.path === "/"; // accedemos a la propiedad path que nos permite saber en donde esta el usuario

// watch(() => route.path,) paso 1: observa la ruta actual.
// si route cambia se ejecuta una nueva funcion. newPath  es nuevo (parametro).
// realizamos una comparacion logica. Si el nuevo path es igual a "/" (home) isHome es => true
// recalculamos su valor cada que cambia la ruta. "/"
// Esto asegura que isHome siempre se actualiza dinámicamente conforme te mueves por el sitio.
const links = [
  {
    label: "Inicio",
    path: "/",
  },
  {
    label: "Servicios",
    path: "/servicios",
  },
  {
    label: "Viajes",
    path: "/viajesTerapeuticos",
  },
];
watch(
  () => route.path,
  (newPath) => {
    isHome = newPath === "/";
  }
);
const menuItems = [
  { id: "hero", label: "Inicio", path: "/" },
  { id: "month-service", label: "Servicio del Mes", path: "✨" },
  { id: "therapies", label: "Terapias", path: "/therapies" },
  { id: "about", label: "Nosotros", path: "/nosotros" },
  { id: "testimonials", label: "Testimonios", path: "/Testimonios" },
  { id: "contact", label: "Contacto", path: "/contacto" },
];
</script>

<template>
  <div>
    <main>
      <FloatingNav :links="links" />

      <div
        id="main-wrapper"
        class="min-h-dvh transform-gpu will-change-transform transition-none"
      >
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
