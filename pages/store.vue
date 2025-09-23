<script setup>
const pageTitle = computed(() => `Artist - Statement`);

useHead({
  title: pageTitle,
  meta: [{ name: "description", content: "Art and high fashion" }],
});
</script>

<template>
  <div
    class="h-screen flex flex-col justify-center items-center w-full bg-white"
  >
    <h1 class="text-sm text-black">Store page</h1>
    <NuxtLink to="/" prefetch>
      <h1 class="text-sm">Ir a Home</h1>
    </NuxtLink>
  </div>
</template>
