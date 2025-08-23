<script setup>
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute(); // Accedemos
let isHome = route.path === "/"; // accedemos a la propiedad path que nos permite saber en donde esta el usuario
const store = useOffCanvasStore();

// watch(() => route.path,) paso 1: observa la ruta actual.
// si route cambia se ejecuta una nueva funcion. newPath  es nuevo (parametro).
// realizamos una comparacion logica. Si el nuevo path es igual a "/" (home) isHome es => true
// recalculamos su valor cada que cambia la ruta. "/"
// Esto asegura que isHome siempre se actualiza dinámicamente conforme te mueves por el sitio.
const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Statement",
    path: "/statement",
    hasDropdown: true,
    options: [],
  },
  {
    label: "Store",
    path: "/store",
    hasDropdown: true,
    options: [
      {
        label: "El mar",
        path: "/publicaciones/el-mar",
      },
      {
        label: "Crónicas nocturnas",
        path: "/publicaciones/cronicas-nocturnas",
      },
    ],
  },
];
watch(
  () => route.path,
  (newPath) => {
    isHome = newPath === "/";
  }
);
</script>

<template>
  <div
    id="app-shell"
    style="--drawer-w: 360px"
    class="min-h-dvh bg-black text-neutral-100 antialiased"
  >
    <main>
      <button
        class="fixed top-4 left-4 z-[80] bg-white/10 hover:bg-white/20 px-3 h-9 rounded-md"
        @click="store.toggle()"
      >
        clic
      </button>
      <div
        id="main-wrapper"
        class="min-h-dvh transform-gpu will-change-transform transition-none"
      >
        <FloatingFooter :links="links" />
      </div>
      <OffCanvas />
    </main>
  </div>
</template>
