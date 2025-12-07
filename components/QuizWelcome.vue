<!-- components/quiz/QuizWelcome.vue -->

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
    class="w-full mx-2 flex flex-col items-center text-center px-4 border border-brand-terracotta pb-10 bg-brand-sand rounded-xl"
  >
    <!-- Espacio para SVG del texto -->
    <div class="w-full flex justify-center pt-14 pb-6">
      <slot name="top-graphic"></slot>
      <!-- Aquí insertarás tu SVG cuando lo tengas -->
    </div>

    <!-- Contenido principal -->
    <div class="w-full max-w-3xl flex flex-col items-center md:px-0 px-4">
      <!-- Título -->
      <h1
        class="text-[45px] text-center md:text-[77px] font-headlines font-bold text-brand-terracotta leading-tight"
      >
        {{ config?.welcomeScreen?.headline || "Descubre tu Servicio Ideal" }}
      </h1>

      <!-- Subtítulo -->
      <p
        class="font-sans text-brand-terracotta/60 text-[13px] md:text-[15px] mt-4"
      >
        {{
          config?.welcomeScreen?.subtitle ||
          "Responde algunas preguntas y te recomendaremos el servicio perfecto para ti."
        }}
      </p>

      <!-- Metadata -->
      <div class="mt-3">
        <span
          class="text-brand-terracotta/60 font-sans text-[12px] md:text-[15px]"
        >
          {{ config?.welcomeScreen?.estimatedTime || "Menos de 3 minutos" }}
        </span>
      </div>

      <!-- Botón centrado -->
      <div class="flex justify-center w-full pt-6">
        <button
          @click="handleStart"
          class="border border-brand-terracotta/90 px-4 py-3 rounded-full text-sm tracking-wider font-sans bg-brand-soft text-brand-terracotta w-[200px]"
        >
          {{ config?.welcomeScreen?.startButtonText || "Comenzar Quiz" }} →
        </button>
      </div>

      <!-- Información adicional -->
      <p class="pt-8 text-[12px] md:text-[10px] max-w-md text-gray-500">
        Tu información es confidencial y solo se usa para recomendarte el
        servicio ideal.
      </p>
    </div>

    <!-- Línea decorativa SVG -->
    <div class="flex justify-center mt-16">
      <svg class="w-32 h-2 opacity-30" viewBox="0 0 120 8">
        <circle cx="4" cy="4" r="3" fill="#C87B5C" />
        <circle cx="20" cy="4" r="3" fill="#C87B5C" />
        <circle cx="36" cy="4" r="3" fill="#C87B5C" />
        <line x1="44" y1="4" x2="76" y2="4" stroke="#C87B5C" stroke-width="2" />
        <circle cx="84" cy="4" r="3" fill="#C87B5C" />
        <circle cx="100" cy="4" r="3" fill="#C87B5C" />
        <circle cx="116" cy="4" r="3" fill="#C87B5C" />
      </svg>
    </div>
  </div>
</template>
