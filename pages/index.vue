<script setup>
import FeaturedServicesSection from "~/components/FeaturedServicesSection.vue";
import HeroSection from "~/components/HeroSection.vue";
import TeamMemberSection from "~/components/TeamMemberSection.vue";
import TestimonialSection from "~/components/TestimonialSection.vue";

import { query } from "~/lib/queries";

const { urlFor, urlForPlaceholder } = useSanityImage();
const { data } = await useSanityQuery(query);
const blocks = computed(() => data.value?.blocks || []);

defineOptions({ name: "index" });

/**
 * Sistema de spacing por tipo de bloque
 * Esto crea ritmo visual consistente
 */
const getSpacing = (blockType) => {
  const spacingMap = {
    heroBlock: "pt-[65px]", // Hero maneja su propia altura
    servicesBlock: "pt-2", // Espaciado generoso
    therapistBlock: "pt-2", // Espaciado generoso
    testimonialBlock: "pt-2", // Espaciado generoso
    ctaBlock: "pt-2", // Espaciado generoso
  };

  return spacingMap[blockType] || "py-16 md:py-24";
};

/**
 * Determina si mostrar divisor después de un bloque
 * Solo entre secciones que necesitan separación visual
 */
const getDividerConfig = (blockType, nextBlockType) => {
  // No mostrar divisor después del hero (tiene su propia transición)
  if (blockType === "heroBlock") return null;

  // No mostrar antes del footer
  if (nextBlockType === "footerBlock") return null;

  // Configuración por tipo
  const dividerMap = {
    servicesBlock: { variant: "dots", spacing: "md" },
    monthServiceBlock: { variant: "line", spacing: "lg" },
    carouselBlock: { variant: "dots", spacing: "md" },
    therapistBlock: null, // Sin divisor después
  };

  return dividerMap[blockType] || null;
};

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
  <main class="home-container">
    <template v-for="(block, index) in blocks" :key="block._key">
      <!-- Sección principal -->
      <section
        :id="block.id"
        :data-block-type="block._type"
        :class="['block-section relative w-full', getSpacing(block._type)]"
      >
        <HeroSection
          v-if="block._type === 'heroBlock'"
          :block="block"
          :urlFor="urlFor"
          :urlForPlaceholder="urlForPlaceholder"
        />

        <FeaturedServicesSection
          v-else-if="block._type === 'servicesBlock'"
          :block="block"
          :urlFor="urlFor"
          :urlForPlaceholder="urlForPlaceholder"
        />

        <TeamMemberSection
          v-else-if="block._type === 'therapistBlock'"
          :block="block"
          :urlFor="urlFor"
          :urlForPlaceholder="urlForPlaceholder"
        />
        <TestimonialSection
          v-else-if="block._type === 'testimonialBlock'"
          :block="block"
        />
        <CTASection
          v-else-if="block._type === 'ctaBlock'"
          :block="block"
          :urlFor="urlFor"
          :urlForPlaceholder="urlForPlaceholder"
        />
      </section>
    </template>
  </main>
</template>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  /* ================================
     Fondo base con patrón de puntos
     Este es el "canvas" de toda la página
     ================================ */
  background-color: #e1cfba; /* brand-sand */
  background-image: radial-gradient(
    rgba(62, 20, 4, 0.04) 1px,
    /* brand-terracotta con baja opacidad */ transparent 1px
  );
  background-size: 4px 4px;
  background-attachment: fixed; /* Efecto parallax sutil */
}

.block-section {
  position: relative;
  width: 100%;
}

/* ================================
   Smooth scrolling
   ================================ */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style>
