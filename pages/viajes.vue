<script setup>
const pageTitle = computed(() => `Viajes Terapéuticos - Viajes`);

useHead({
  title: pageTitle,
  meta: [{ name: "description", content: "Art and high fashion" }],
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
      Viajes
    </h1>

    <!-- Subtítulo / descripción opcional -->
    <p
      class="mt-6 text-lg md:text-2xl font-serif italic text-gray-800 text-center max-w-xl"
    >
      Explora experiencias de bienestar únicas y transformadoras.
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
