<script setup>
defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <div class="hero-wrapper relative w-full h-screen overflow-hidden">
    <!-- Video background (preferido) -->
    <video
      v-if="block.backgroundVideo?.url"
      class="hero-bg absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      playsinline
    >
      <source :src="block.backgroundVideo.url" type="video/webm" />
    </video>
    <NuxtImg
      v-else-if="block.backgroundImage?.url"
      :src="block.backgroundImage.url"
      :alt="block.backgroundImage.alt || ''"
      :placeholder="block.backgroundImage.asset?.metadata?.lqip"
      class="hero-bg absolute inset-0 w-full h-full object-cover"
      loading="eager"
      fetchpriority="high"
    />

    <div class="hero-overlay absolute inset-0 bg-black/40">
      <div
        class="relative z-10 w-full h-full flex items-center justify-start px-6 sm:px-10 lg:px-20"
      >
        <div class="max-w-3xl md:text-center">
          <h1
            v-if="block.title"
            class="text-6xl md:text-8xl lg:text-9xl leading-tight font-headlines tracking-tight text-white text-left"
            data-text-reveal
          >
            {{ block.title }}
          </h1>

          <p
            v-if="block.subtitle"
            class="mt-6 text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90 max-w-2xl md:text-left"
          >
            {{ block.subtitle }}
          </p>

          <a
            v-if="block.ctaText && block.ctaLink"
            :href="block.ctaLink"
            class="cta-button inline-block mt-8 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            {{ block.ctaText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
