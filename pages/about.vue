<script setup>
const pageTitle = computed(() => `Servicios - Servicios Centro Holístico`);

useHead({
  title: pageTitle,
  meta: [
    {
      name: "description",
      content:
        "Servicios y experiencias de bienestar holístico. Descubre terapias, viajes terapéuticos y próximos lanzamientos en nuestro centro.",
    },
    {
      name: "keywords",
      content:
        "servicios holísticos, terapias, bienestar, viajes terapéuticos, centro holístico",
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen w-full bg-pink-200 flex flex-col justify-center items-center px-4 md:px-16"
  >
    <!-- Título principal -->
    <h1
      class="text-5xl md:text-8xl font-headlines text-black leading-tight md:leading-[1.1] text-center max-w-3xl"
    >
      Nuestra Escencia
    </h1>

    <!-- Subtítulo opcional / mensaje de próximo lanzamiento -->
    <p
      class="mt-6 text-lg md:text-2xl font-serif italic text-gray-800 text-center max-w-xl"
    >
      Próximamente disponibles. ¡Mantente atento a nuestras novedades!
    </p>

    <!-- Link a Home -->
    <NuxtLink
      to="/"
      prefetch
      class="mt-12 inline-block bg-black text-white text-lg md:text-xl font-sans uppercase tracking-wide px-8 py-4 rounded-full shadow-lg hover:bg-pink-300 hover:text-black transition-colors duration-300"
    >
      Ir a Home
    </NuxtLink>
  </div>
</template>
