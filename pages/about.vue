<script setup>
import { aboutQuery } from "~/lib/aboutQueries";


const pageTitle = computed(() => `Servicios - Servicios Centro Holístico`);
const { data: about } = await useSanityQuery(aboutQuery);

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
  <div class="relative min-h-screen bg-brand-sand text-white overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img 
        alt="Botanical background"
        class="w-full h-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/95"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">

      <div class="container mx-auto px-8 py-20">
        <!-- Hero Title -->
        <div class="mb-32">
          <h1 class="font-headlines text-8xl md:text-9xl font-light leading-none mb-4 tracking-tight md:text-start text-center">
            {{ about.title }}
            <br />
          </h1>
          <div class="h-px w-32 bg-white/30 mt-8"></div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid md:grid-cols-2 gap-16 mb-32">
          <!-- Left Column - Stats -->
          <div class="space-y-8">
              <div>
                <div
                  v-for="highlight in about.practiceHighlights"
                  :key="highlight._key"
                  class="group flex items-baseline justify-between pb-8 mb-2 border-b border-white/20 transition-colors hover:border-white/40"
                >
                  <h3 class="font-sans text-lg font-bold tracking-wide transition-colors group-hover:text-white">
                    {{ highlight.title }}
                  </h3>

                  <span class="font-sans text-2xl font-bold transition-colors group-hover:text-white">
                    {{ highlight.value }}
                  </span>
                </div>
              </div>
          </div>

          <!-- Right Column - Description -->
          <div class="space-y-8">
            <div>
              <h2 class="font-headlines text-3xl font-light mb-7">
                Nuestra Esencia
              </h2>
              <div class="h-px w-24 bg-white/30 mb-8"></div>
              <p class="font-sans text-base leading-relaxed text-white/80 font-bold">
                {{ about.aboutStatement }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="border-t border-white/10 pt-8">
          <p class="font-sans text-sm text-white/50 tracking-wide text">
            Agenda disponible • Acompañamiento presencial y a distancia         
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


