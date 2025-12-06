<script setup>
import ServicesBlock from "~/components/ServicesBlock.vue";
import MonthService from "~/components/MonthService.vue";
import GalleryMarquee from "~/components/GalleryMarquee.vue";
import QuizBlock from "~/components/QuizBlock.vue";
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
          'h-screen md:h-screen': block._type === 'heroBlock',
          // Otros bloques usan padding natural
          'md:py-2': block._type !== 'heroBlock',
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
      <QuizBlock
        v-else-if="block._type === 'quizBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />
      <GalleryMarquee
        v-else-if="block._type === 'carouselBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />
      <FooterBlock
        v-else-if="block._type === 'footerBlock'"
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
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #e1cfba;
  background-image: radial-gradient(
    rgba(201, 20, 20, 0.05) 1px,
    transparent 1px
  );
  background-size: 3px 3px;
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
