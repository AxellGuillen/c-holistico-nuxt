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
  <div
    class="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-brand-soft px-6"
  >
    <!-- Background Texture/Gradient Overlay -->
    <div class="absolute inset-0 pointer-events-none opacity-40">
      <div
        class="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-blush rounded-full mix-blend-multiply filter blur-[100px] animate-blob"
      ></div>
      <div
        class="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-sand rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-[40%] left-[20%] w-[50%] h-[50%] bg-brand-clay/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"
      ></div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 text-center max-w-5xl mx-auto space-y-10 animate-fade-in-up"
    >
      <!-- Tagline -->
      <div class="flex justify-center">
        <span
          class="inline-block py-1.5 px-5 rounded-full border border-brand-earth/40 text-brand-terracotta/80 text-xs tracking-[0.25em] uppercase font-bold bg-white/20 backdrop-blur-sm shadow-sm"
        >
          Coming Soon
        </span>
      </div>

      <!-- Hero Title -->
      <div class="space-y-2">
        <h1
          class="font-headlines text-6xl md:text-8xl lg:text-9xl text-brand-terracotta leading-none tracking-tight"
        >
          VIAJES
        </h1>
        <p
          class="font-serif italic text-3xl md:text-5xl lg:text-6xl text-brand-earth font-light"
        >
          terapéuticos
        </p>
      </div>

      <!-- Description -->
      <p
        class="text-brand-terracotta/80 text-lg md:text-xl font-body font-light max-w-2xl mx-auto leading-relaxed"
      >
        Estamos curando experiencias inmersivas en destinos sagrados. <br />
        Un viaje para reconectar, sanar y expandir tu consciencia.
      </p>

      <!-- CTA Button -->
      <div class="pt-8">
        <NuxtLink
          to="/"
          class="group relative inline-flex items-center gap-3 px-10 py-5 bg-brand-terracotta text-brand-base rounded-full overflow-hidden transition-all duration-300 hover:bg-brand-earth hover:shadow-xl hover:shadow-brand-earth/20 hover:-translate-y-1"
        >
          <span
            class="relative z-10 font-sans tracking-widest uppercase text-sm font-bold"
          >
            Volver al Inicio
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1 relative z-10"
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

    <!-- Decorative Footer Text -->
    <div
      class="absolute bottom-8 text-brand-earth/40 text-xs tracking-widest uppercase font-sans"
    >
      Holistic Wellness Center
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optional gentle blob animation if not in global css */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
