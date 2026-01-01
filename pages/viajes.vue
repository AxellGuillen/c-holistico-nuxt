<script setup>
const pageTitle = "Viajes Terapéuticos - Próximamente";

useHead({
  title: pageTitle,
  meta: [
    {
      name: "description",
      content:
        "Descubre nuestros próximos viajes terapéuticos y experiencias de bienestar. Espacios sagrados para tu transformación.",
    },
  ],
});
</script>

<template>
  <div class="relative min-h-screen bg-brand-sand text-white overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/95"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <div class="container mx-auto px-8 py-20 flex justify-center">
        <!-- BLOQUE CENTRAL -->
        <div class="w-full max-w-3xl text-center">
          <!-- Hero -->
          <div class="min-h-[70vh] flex flex-col justify-center items-center">
            <!-- Badge -->
            <div class="mb-8 md:mb-12">
              <span
                class="inline-block px-6 py-2 rounded-full border border-white/30 text-white/80 text-xs tracking-[0.3em] uppercase font-medium font-sans"
              >
                Próximamente
              </span>
            </div>

            <!-- Title -->
            <h1
              class="font-headlines text-7xl md:text-9xl font-light leading-none mb-6 tracking-tight text-white"
            >
              Viajes
              <br />
              <span class="text-6xl md:text-8xl">Terapéuticos</span>
            </h1>

            <!-- Divider -->
            <div class="h-px w-32 bg-white/30 mb-12"></div>

            <!-- Description -->
            <div class="max-w-2xl mb-16">
              <p
                class="font-sans text-lg md:text-xl leading-relaxed text-white/80 font-bold mb-6"
              >
                Estamos curando experiencias inmersivas en destinos sagrados.
              </p>
              <p class="font-sans text-base leading-relaxed text-white/60">
                Un viaje para reconectar, sanar y expandir tu consciencia.
                Espacios diseñados para tu transformación profunda.
              </p>
            </div>

            <!-- CTA -->
            <div class="mb-12">
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-3 bg-brand-base text-brand-terracotta px-10 py-4 rounded-full text-sm font-bold hover:bg-white transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/20 tracking-widest uppercase font-sans"
              >
                <span>Volver al Inicio</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Footer Info ✅ ahora sí centrado -->
          <div class="border-t border-white/10 pt-8 mt-20">
            <p class="font-sans text-sm text-white/50 tracking-wide">
              Holistic Wellness Center • Experiencias transformadoras
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Clean design matching brand aesthetic */
</style>
