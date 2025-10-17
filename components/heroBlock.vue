<script setup>
import { computed } from "vue";
const props = defineProps(["block", "urlFor", "urlForPlaceholder"]);

const splitTitle = computed(() => props.block?.title?.split("") || []);
</script>

<template>
  <div class="hero-wrapper relative w-full h-screen overflow-hidden">
    <!-- Background -->
    <video
      v-if="block.backgroundVideo?.url"
      class="absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="block.backgroundVideo.url" type="video/webm" />
    </video>
    <NuxtImg
      v-else-if="block.backgroundImage?.url"
      :src="block.backgroundImage.url"
      class="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 flex flex-col justify-between py-8 sm:py-12 lg:py-16 px-6 sm:px-10 lg:px-20 z-10"
    >
      <!-- Subtítulo -->

      <!-- Título -->
      <div class="w-full flex items-center justify-center mb-12 sm:mb-16">
        <h1
          v-if="block.title"
          class="font-headlines font-black text-white flex items-center justify-center w-full px-4 absolute bottom-10"
        >
          <span
            v-for="(char, i) in splitTitle"
            :key="i"
            class="inline-block sm:text-[10vw] md:text-[9vw] lg:text-[400px] leading-none uppercase"
          >
            {{ char === " " ? "\u00A0" : char }}
          </span>
        </h1>
      </div>
    </div>
  </div>
</template>
