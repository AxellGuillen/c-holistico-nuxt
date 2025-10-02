<script setup>
const pageTitle = computed(() => `Servicios - Servicios Centro Holístico`);

useHead({
  title: pageTitle,
  meta: [{ name: "description", content: "Art and high fashion" }],
});
</script>

<template>
  <div
    class="h-screen flex flex-col justify-center items-center w-full bg-pink-200"
  >
    <h1 class="text-black font-headlines text-8xl">Servicios</h1>
    <NuxtLink to="/" prefetch>
      <h1 class="text-4xl text-black">Ir a Home</h1>
    </NuxtLink>
  </div>
</template>
