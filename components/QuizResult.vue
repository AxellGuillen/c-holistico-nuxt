<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  service: Object,
  config: Object,
});

const emit = defineEmits(["restart"]);

const getCTAIcon = (ctaType) => {
  switch (ctaType) {
    case "whatsapp":
      return "";
    case "calendar":
      return "";
    case "contact":
      return "";
    default:
      return "";
  }
};
</script>

<template>
  <div class="max-w-[600px] h-[600px] mx-auto px-4 py-8 pt-20">
    <!-- Badge categoría -->

    <!-- Título -->
    <h2
      class="font-sans text-4xl md:text-5xl font-bold leading-none mb-4 tracking-tight md:text-center text-center text-white"
    >
      {{ config?.resultScreen?.resultHeadline }}
    </h2>

    <!-- Tarjeta -->
    <div
      class="rounded-2xl overflow-hidden shadow-xl flex flex-col items-center"
    >
      <!-- Imagen -->
      <div
        v-if="service.thumbnail"
        class="w-[200px] h-[200px] overflow-hidden rounded-t-2xl flex justify-center items-center"
      >
        <NuxtImg
          :src="service.thumbnail?.asset?.url"
          :alt="service.name"
          class="object-contain w-full"
        />
      </div>

      <!-- Contenido -->
      <div class="p-8">
        <h3
          class="font-headlines text-6xl md:text-7xl font-light leading-none mb-4 tracking-tight md:text-center text-center text-white"
        >
          {{ service.name }}
        </h3>

        <p
          class="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-sans text-center max-w-2xl mx-auto font-bold"
        >
          {{ service.shortDescription }}
        </p>

        <!-- Beneficios -->
        <div class="mb-6">
          <h4
            class="font-headlines mb-4 text-white font-semibold text-2xl tracking-wide"
          >
            Beneficios:
          </h4>

          <ul class="space-y-2">
            <li
              v-for="(benefit, index) in service.benefits"
              :key="index"
              class="text-white/70 leading-relaxed font-sans text-[15px] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-terracotta"
            >
              {{ benefit }}
            </li>
          </ul>
        </div>

        <!-- Ideal para -->
        <div v-if="service.idealFor" class="mb-6">
          <h4
            class="font-headlines mb-4 text-white font-semibold text-2xl tracking-wide mt-8"
          >
            Ideal para:
          </h4>

          <ul class="space-y-2">
            <li
              v-for="(profile, index) in service.idealFor"
              :key="index"
              class="text-white/70 leading-relaxed font-sans text-[15px] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-terracotta"
            >
              {{ profile }}
            </li>
          </ul>
        </div>

        <!-- Metadata -->
        <div
          class="flex flex-col gap-4 mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between mt-8"
        >
          <!-- Duración -->
          <span class="flex items-center gap-2 sm:w-1/3 sm:justify-center">
            <Icon icon="weui:time-outlined" class="w-5 h-5 pb-1" />
            {{ service.duration }}
          </span>

          <!-- Formato -->
          <span class="flex items-center gap-2 sm:w-1/3 sm:justify-center">
            <Icon icon="lucide:map-pin" class="w-5 h-5 pb-1" />
            {{
              service.format === "presencial"
                ? "Presencial"
                : service.format === "online"
                ? "Online"
                : "Presencial u Online"
            }}
          </span>

          <!-- Precio -->
          <span
            v-if="service.price"
            class="flex items-center gap-2 sm:w-1/3 sm:justify-center"
          >
            <Icon icon="lucide:banknote" class="w-5 h-5 pb-1" />
            ${{ service.price }} {{ service.currency }}
          </span>
        </div>

        <!-- CTA -->
        <a
          :href="service.ctaUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-fill-hover block w-full py-4 text-center text-brand-terracotta font-semibold font-sans text-lg rounded-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg bg-brand-sand/60"
        >
          <span> {{ getCTAIcon(service.ctaType) }} {{ service.ctaText }} </span>
        </a>
      </div>
    </div>

    <!-- Acciones -->
    <div class="mt-8 text-center">
      <button
        @click="emit('restart')"
        class="px-6 py-3 bg-brand-sand border rounded-full font-medium transition text-brand-terracotta"
      >
        Hacer el quiz nuevamente
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-fill-hover {
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background-color: white;
  font-weight: 500;
  border-radius: 9999px;
  transition: border-color 0.6s ease, box-shadow 0.6s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}
.btn-fill-hover::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fcf2ed 0%, #e1cfba 100%);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 0;
}
.btn-fill-hover:hover::before {
  transform: scaleY(1);
}
.btn-fill-hover span,
.btn-fill-hover svg {
  position: relative;
  z-index: 1;
  color: #3e1404;
  transition: color 0.6s ease;
}
.btn-fill-hover:hover {
  border-color: #480f03;
  box-shadow: 0 12px 32px rgba(246, 204, 196, 0.3);
}
</style>
