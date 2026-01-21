<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps(["block"]);

const testimonialIndex = ref(0);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    testimonialIndex.value =
      (testimonialIndex.value + 1) % props?.block.testimonials.length;
  }, 4000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <section
    class="relative min-h-[300px] h-[450px] py-16 md:py-40 bg-surface-muted rounded-2xl overflow-hidden"
  >
    <div
      class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-emphasis to-transparent pointer-events-none"
    />
    <div
      class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-emphasis to-transparent pointer-events-none"
    />
    <div
      class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-surface-emphasis to-transparent pointer-events-none"
    />
    <div
      class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-emphasis to-transparent pointer-events-none"
    />

    <div class="section-content">
      <div class="relative h-64 md:h-40 flex items-center justify-center">
        <div
          v-for="(testimonial, index) in block.testimonials"
          :key="testimonial._key"
          class="absolute inset-0 text-center text-content-primary transition-opacity duration-500"
          :class="index === testimonialIndex ? 'opacity-100' : 'opacity-0'"
        >
          <p class="text-heading-lg pb-4" v-if="testimonial.quote">
            {{ testimonial.quote }}
          </p>
          <p
            class="text-heading-md pb-2 text-content-muted"
            v-if="testimonial.author"
          >
            {{ testimonial.author }}
          </p>
          <p class="text-body-md" v-if="testimonial.rating">
            <Icon
              v-for="star in testimonial.rating"
              :key="star"
              icon="heroicons:star-20-solid"
              class="w-8 h-8 text-yellow-500 inline-block"
            />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
