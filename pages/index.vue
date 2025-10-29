<script setup>
import MonthService from "~/components/MonthService.vue";
import ServicesBlock from "~/components/ServicesBlock.vue";
import { query } from "~/lib/queries";

const { urlFor, urlForPlaceholder } = useSanityImage();
const { data } = await useSanityQuery(query);
const blocks = computed(() => data.value?.blocks || []);

useHead({
  title: data.value?.title || "Centro Holístico",
  meta: [
    {
      name: "description",
      content: data.value?.description || "",
    },
  ],
});
</script>

<template>
  <main class="home-container bg-brand-sand">
    <section
      v-for="block in blocks"
      :key="block._key"
      :id="block.id"
      :data-block-type="block._type"
      :class="[
        'block-section relative w-full',
        {
          // Solo el Hero ocupa altura completa
          'h-[100dvh] md:h-screen': block._type === 'heroBlock',
          // Otros bloques usan padding natural
          ' md:py-20': block._type !== 'heroBlock',
        },
      ]"
    >
      <HeroBlock
        v-if="block._type === 'heroBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />
      <ServicesBlock
        v-else-if="block._type === 'servicesBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />
      <MonthService
        v-else-if="block._type === 'monthServiceBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />
    </section>
  </main>
</template>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
}

.block-section {
  position: relative;
  width: 100%;
}

/* Asegura que el scroll sea suave */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style>
