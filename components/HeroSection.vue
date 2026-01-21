<script setup>
const props = defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <section class="relative min-h-svh rounded-2xl bg-surface-emphasis">
    <NuxtImg
      :src="block.backgroundImage?.url"
      :alt="block.backgroundImage?.alt"
      class="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/10 object-cover"
    />
    <div
      class="absolute inset-0 flex flex-col justify-end md:flex-row md:items-end md:justify-between py-24 md:py-20 px-5 gap-8 md:gap-6"
    >
      <h1 class="text-hero-title text-display-hero-mobile md:text-display-hero">
        Todo crecimiento comienza desde la raíz.
      </h1>
      <p
        class="text-body-md md:text-body-lg text-content-muted max-w-[45ch] md:max-w-[50ch]"
      >
        En Raíces Centro Holístico trabajamos la salud desde una mirada
        holística, atendiendo el origen de cada proceso para un crecimiento
        consciente.
      </p>
      <div
        class="block md:hidden rounded-nav p-[2px] bg-nav-border backdrop-blur-nav shadow-nav transition-colors duration-200"
      >
        <NuxtLink
          to="/servicios"
          class="flex items-center rounded-nav bg-accent justify-center hover:bg-nav-link-hover px-6 h-nav-height text-nav-cta text-nav-cta-text hover:text-nav-cta-text-hover uppercase transition-colors duration-200"
        >
          Agendar Cita
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
