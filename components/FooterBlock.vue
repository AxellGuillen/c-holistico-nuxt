<script setup>
import { NuxtImg } from "#components";

defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <footer class="w-full bg-brand-sand text-brand-terracotta">
    <div class="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center md:text-left">
      <!-- Main content grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        <!-- Seasonal message section -->
        <div class="lg:col-span-2">
          <p
            class="text-2xl md:text-3xl font-headlines leading-relaxed max-w-2xl text-center"
          >
            {{ block.seasonalMessage }}
          </p>
        </div>

        <!-- Contact info section -->
        <div
          class="flex flex-col items-center md:items-start gap-3 text-sm font-sans flex-1 text-center md:text-left"
        >
          <div class="space-y-2">
            <a
              :href="`mailto:${block.email}`"
              class="block hover:opacity-70 transition-opacity"
            >
              {{ block.email }}
            </a>
            <p class="opacity-80">{{ block.schedule }}</p>
          </div>

          <p class="opacity-80 leading-relaxed max-w-xs">
            {{ block.studioAddress }}
          </p>

          <!-- Socials inline with contact -->
          <div class="flex gap-3 mt-4">
            <a
              v-if="block.socials?.instagram"
              :href="block.socials.instagram.url"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-all hover:scale-110 hover:opacity-70"
              aria-label="Instagram"
            >
              <img
                :src="block.socials.instagram.icon.url"
                :alt="block.socials.instagram.icon.alt || 'Instagram'"
                class="w-5 h-5"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom decorative element -->
      <div
        v-if="block.bottomSvg?.url"
        class="w-full border-t border-brand-terracotta/10 pt-8"
      >
        <NuxtImg
          :src="block.bottomSvg.url"
          :alt="block.bottomSvg.alt || ''"
          class="w-full max-w-md mx-auto h-auto opacity-60"
          loading="lazy"
        />
      </div>
    </div>
  </footer>
</template>
