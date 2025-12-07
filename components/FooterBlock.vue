<script setup>
import { NuxtImg } from "#components";
import { Icon } from "@iconify/vue";

defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <footer class="w-full bg-brand-sand text-brand-terracotta">
    <div class="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
      <!-- Main content grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        <!-- Seasonal message section -->
        <div class="lg:col-span-2">
          <p
            class="text-[24px] md:text-[30px] font-headlines leading-relaxed max-w-2xl text-center"
          >
            {{ block.seasonalMessage }}
          </p>
        </div>

        <!-- Contact info section -->
        <div
          class="flex flex-col items-center md:items-start gap-3 text-sm font-sans flex-1 text-center md:text-left pr-10"
        >
          <!-- CONTACTO -->
          <div class="flex flex-col gap-4 w-full">
            <div class="flex items-center gap-5">
              <Icon
                icon="ph:clock-light"
                width="20"
                height="20"
                class="text-brand-terracotta"
              />
              <p class="text-brand-terracotta font-headlines text-[15px]">
                {{ block.schedule }}
              </p>
            </div>
            <div class="flex items-center gap-5">
              <Icon
                icon="material-symbols-light:mail-outline-rounded"
                width="20"
                height="20"
                class="text-brand-terracotta"
              />
              <a
                :href="`mailto:${block.email}`"
                class="text-brand-terracotta font-headlines text-[15px]"
              >
                {{ block.email }}
              </a>
            </div>
            <div class="flex items-start md:items-center gap-5">
              <Icon
                icon="material-symbols-light:location-on-outline-rounded"
                width="26"
                height="26"
                class="text-brand-terracotta"
              />
              <p
                class="text-brand-terracotta font-headlines text-[15px] text-start"
              >
                {{ block.studioAddress }}
              </p>
            </div>
            <div
              class="flex gap-3 mt-4 w-full justify-evenly bg-brand-terracotta px-5 mx-auto"
            >
              <Icon
                icon="ei:sc-instagram"
                width="35"
                height="35"
                class="text-brand-sand transition-all hover:scale-110 hover:opacity-70"
              />
              <Icon
                icon="mdi:facebook"
                width="30"
                height="30"
                class="text-brand-sand transition-all hover:scale-110 hover:opacity-70 pt-1"
              />
            </div>
          </div>

          <!-- Socials inline with contact -->
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
