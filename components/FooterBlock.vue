<script setup>
import { NuxtImg } from "#components";
import { Icon } from "@iconify/vue";

defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <footer class="w-full bg-brand-sand text-brand-terracotta">
    <div class="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <!-- Main Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        
        <!-- Brand / Seasonal Message -->
        <div class="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
          <h3 class="text-xs font-bold uppercase tracking-widest text-brand-terracotta/50 font-sans ">Ubicación</h3>
          <div class="w-full h-64 rounded-lg overflow-hidden pt-1">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.150313440477!2d-99.09208597532793!3d19.36264309291242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fde86f8c04ef%3A0xbeea2b048bb1ab63!2sRAICES%20CENTRO%20HOLISTICO!5e0!3m2!1ses!2smx!4v1765661987390!5m2!1ses!2smx" width="400" 
            height="300" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
          <h4 class="text-xs font-bold uppercase tracking-widest text-brand-terracotta/50 font-sans">Contacto</h4>
          
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="ph:clock-light" class="w-5 h-5 text-brand-terracotta/70 flex-shrink-0" />
              <span class="text-sm font-sans">
                {{ block.schedule }}
              </span>
            </div>
            <a :href="`mailto:${block.email}`" class="flex items-center gap-3 group">
              <Icon icon="material-symbols-light:mail-outline-rounded" class="w-5 h-5 text-brand-terracotta/70 flex-shrink-0" />
              <span class="text-sm font-sans group-hover:underline">
                {{ block.email }}
              </span>
            </a>
            <div class="flex items-start gap-3">
              <Icon icon="material-symbols-light:location-on-outline-rounded" class="w-5 h-5 text-brand-terracotta/70 flex-shrink-0 mt-0.5" />
              <span class="text-sm font-sans leading-snug text-start"> 
                {{ block.studioAddress }}</span>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex flex-col items-center md:items-start gap-5">
          <h4 class="text-xs font-bold uppercase tracking-widest text-brand-terracotta/50 font-sans">
            Síguenos
          </h4>
          <div class="flex items-center gap-4">
            <a :href="block.socials?.instagram?.url" 
            aria-label="Instagram"
            class="p-3 bg-brand-terracotta/10 rounded-full transition-all  duration-500 ease-out hover:bg-brand-terracotta hover:text-white ">
              <Icon icon="mdi:instagram" class="w-5 h-5" />
            </a>
            <a :href="block.socials?.facebook?.url" 
             aria-label="Facebook" 
             class="p-3 bg-brand-terracotta/10 rounded-full transition-all duration-500 ease-out hover:bg-brand-terracotta hover:text-white ">
              <Icon icon="mdi:facebook" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-16 pt-8 border-t border-brand-terracotta/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Decorative SVG -->
        <div v-if="block.bottomSvg?.url" class="order-1 md:order-2">
          <NuxtImg
            :src="block.bottomSvg.url"
            :alt="block.bottomSvg.alt || ''"
            class="h-8 w-auto opacity-50"
            loading="lazy"
          />
        </div>
        
        <!-- Copyright -->
        <p class="text-xs text-brand-terracotta/40 font-sans order-2 md:order-1">
          © {{ new Date().getFullYear() }} Raíces Centro Holístico. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
