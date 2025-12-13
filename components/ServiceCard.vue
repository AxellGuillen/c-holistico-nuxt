<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <NuxtLink :to="`/servicios/${service.slug.current}`" class="group h-full block">
    <article class="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-brand-soft transition-all duration-300 hover:shadow-xl hover:border-brand-clay/30">
      
      <!-- Image Container -->
      <div class="relative h-56 overflow-hidden">
        <NuxtImg
          :src="service.thumbnail?.asset?.url"
          :alt="service.name"
          class="w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
        />
        <!-- Category Badge -->
        <span class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-terracotta rounded-full shadow-sm">
          {{ service.category?.name }}
        </span>
      </div>
      <!-- Content -->
      <div class="p-6 flex flex-col flex-1">
        <!-- Title -->
        <h3 class="font-headlines text-2xl text-brand-terracotta mb-3 leading-tight group-hover:text-brand-earth transition-colors">
          {{ service.name }}
        </h3>
        <!-- Description -->
        <p class="font-sans text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
          {{ service.shortDescription }}
        </p>
        <!-- Footer Info -->
        <div class="flex items-center justify-between pt-4 border-t border-brand-soft mt-auto">
          <div class="flex items-center text-brand-terracotta/80 text-sm font-medium gap-2">
              <Icon icon="weui:time-outlined" class="w-5 h-5 pb-1" />
             {{ service.duration }} 
          </div>
          
          <div v-if="service.price" class="text-brand-terracotta font-bold text-lg font-headlines">

            <div>
              ${{ service.price }}
            </div>
           
          </div>
          <div v-else class="text-brand-earth font-medium text-sm flex items-center group/btn">
            Ver detalles
            <svg class="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>