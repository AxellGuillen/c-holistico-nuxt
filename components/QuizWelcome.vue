<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["start"]);

const handleStart = () => {
  emit("start");
};
</script>

<template>
  <div
    class="w-full mx-2 flex flex-col items-center text-center px-4 pb-10 md:min-h-[calc(100dvh+1px)]"
  >
    <!-- Espacio para SVG del texto -->
    <div class="w-full flex justify-center pt-14 pb-6">
      <slot name="top-graphic"></slot>
      <!-- Aquí insertarás tu SVG cuando lo tengas -->
    </div>

    <!-- Contenido principal -->
    <div
      class="w-full max-w-3xl flex flex-col items-center md:px-0 px-4 relative z-10"
    >
      <h1
        class="font-headlines text-4xl md:text-7xl font-light leading-none mb-4 tracking-tight md:text-center text-center text-white pt-20"
      >
        {{ config?.welcomeScreen?.headline }}
      </h1>
      <p
        class="font-sans text-white/50 text-sm md:text-base mt-2 max-w-lg min-h-[3rem]"
      >
        {{ config?.welcomeScreen?.subtitle }}
      </p>

      <div class="mt-3">
        <span
          class="text-white/70 font-sans text-xs md:text-sm tracking-wide uppercase font-medium"
        >
          {{ config?.welcomeScreen?.estimatedTime }}
        </span>
      </div>
      <div class="flex justify-center w-full pt-6">
        <button
          @click="handleStart"
          class="bg-brand-sand text-brand-terracotta px-12 py-4 rounded-full text-lg font-bold hover:bg-white transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/10"
        >
          {{ config?.welcomeScreen?.startButtonText }} →
        </button>
      </div>
      <p class="pt-8 text-[12px] md:text-xs max-w-md text-white/40">
        Tu información es confidencial y solo se usa para recomendarte el
        servicio ideal.
      </p>
    </div>
    <div class="flex justify-center mt-16">
      <svg class="w-32 h-2 opacity-30" viewBox="0 0 120 8">
        <circle cx="4" cy="4" r="3" fill="#ffffff" />
        <circle cx="20" cy="4" r="3" fill="#ffffff" />
        <circle cx="36" cy="4" r="3" fill="#ffffff" />
        <line x1="44" y1="4" x2="76" y2="4" stroke="#ffffff" stroke-width="2" />
        <circle cx="84" cy="4" r="3" fill="#ffffff" />
        <circle cx="100" cy="4" r="3" fill="#ffffff" />
        <circle cx="116" cy="4" r="3" fill="#ffffff" />
      </svg>
    </div>
  </div>
</template>
