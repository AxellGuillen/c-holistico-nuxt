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

watch(
  () => route.path,
  (newPath) => {
    isHome = newPath === "/";
  }
);
</script>

<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>
