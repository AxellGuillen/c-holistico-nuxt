<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps(["block"]);

const imageIndex = ref(0);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    imageIndex.value = (imageIndex.value + 1) % props.block.images.length;
  }, 6000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <section v-if="block">
    <div
      class="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-2 min-h-screen rounded-2xl overflow-hidden"
    >
      <div class="relative h-full">
        <div
          v-for="(image, index) in block.images"
          :key="index"
          class="absolute inset-0 transition-opacity duration-700"
          :class="index === imageIndex ? 'opacity-100' : 'opacity-0'"
        >
          <NuxtImg
            :src="image.asset.url"
            :alt="image.alt"
            class="object-cover w-full h-full"
          />
        </div>
      </div>
      <div
        class="bg-accent/80 flex items-center justify-center p-12 flex-col gap-4"
      >
        <span class="uppercase text-body-sm text-surface"
          >¿Primera Vez? Conócenos</span
        >
        <h2 class="text-display-lg text-center text-surface" v-if="block.title">
          {{ block.title }}
        </h2>
        <p
          class="text-center text-surface text-content-muted mb-12"
          v-if="block.subtitleOne"
        >
          {{ block.subtitleOne }}
        </p>
        <div
          class="rounded-nav p-[2px] bg-nav-border backdrop-blur-nav shadow-nav transition-colors duration-200 flex justify-center bg-nav-bg"
        >
          <NuxtLink
            to="/servicios"
            class="flex items-center rounded-nav bg-nav-bg hover:bg-nav-link-hover px-6 h-nav-height text-nav-cta text-nav-cta-text hover:text-nav-cta-text-hover uppercase transition-colors duration-200 shadow-md"
          >
            Agendar Cita
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
