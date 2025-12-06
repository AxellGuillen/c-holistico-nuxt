<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";

defineProps(["block", "urlFor", "urlForPlaceholder"]);
const { $gsap } = useNuxtApp();

const textTitleMobile = ref(null);
const textTitleDesktop = ref(null);
const boxes = ref([]);

// Variables de control
let ctx = null;
let splitSubtitle = null;

const setBoxRef = (el, index) => {
  if (el) {
    boxes.value[index] = el;
  }
};

onMounted(async () => {
  await nextTick();

  ctx = $gsap.context(() => {
    if (textTitleMobile.value) {
      $gsap.from(textTitleMobile.value, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textTitleMobile.value,
          start: "top bottom-=100px",
          once: true,
          markers: false,
        },
      });
    }

    if (textTitleDesktop.value) {
      $gsap.from(textTitleDesktop.value, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textTitleDesktop.value,
          start: "top 80%",
          once: true,
          markers: true,
        },
      });
    }

    boxes.value.forEach((card, index) => {
      if (card) {
        $gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: index * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            once: true,
            markers: false,
          },
        });
      }
    });
  });

  if (import.meta.client && window.innerWidth >= 768) {
    $gsap.from(boxes.value, {
      opacity: 0,
      y: 60,
      duration: 1.1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: boxes.value[0],
        start: "top 90%",
        once: true,
        markers: false,
      },
    });
  }
});

onUnmounted(() => {
  if (splitSubtitle) {
    splitSubtitle.revert();
    splitSubtitle = null;
  }

  if (ctx) {
    ctx.revert();
    ctx = null;
  }

  boxes.value = [];
});
</script>

<template>
  <section class="py-1 md:py-2">
    <div class="max-w-[1600px] mx-auto px-4 md:px-0">
      <ClientOnly>
        <div class="md:hidden">
          <div class="flex flex-col gap-10 text-center font-headlines mb-8">
            <!-- Título animado -->
            <div>
              <h2
                ref="textTitleMobile"
                class="text-5xl font-light transform-gpu will-change-transform"
              >
                {{ block.title }}
              </h2>
            </div>

            <!-- Subtítulo -->
            <div>
              <h3
                class="text-base font-sans leading-relaxed text-brand-terracotta/90 max-w-[320px] mx-auto"
              >
                {{ block.subtitle }}
              </h3>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <NuxtLink
              v-for="(cat, i) in block.categories"
              :key="cat._key"
              :to="`/${cat.slug}`"
              class="block"
            >
              <div
                :ref="(el) => setBoxRef(el, i)"
                class="relative min-h-[550px] overflow-hidden rounded-3xl group"
              >
                <NuxtImg
                  v-if="cat.backgroundImage?.url"
                  :src="cat.backgroundImage.url"
                  :alt="cat.backgroundImage.alt || cat.title"
                  class="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  class="absolute inset-0 bg-black/25 text-white flex flex-col justify-end items-center px-6 pb-6 gap-5 group-hover:bg-black/40 transition-colors duration-500 mb-4 min-h-full"
                >
                  <h3
                    class="text-4xl font-headlines tracking-wide drop-shadow-lg font-light text-center leading-tight"
                  >
                    {{ cat.title }}
                  </h3>

                  <span
                    class="border border-white/90 px-4 py-3 rounded-full text-sm tracking-wider font-sans bg-brand-sand text-brand-terracotta flex items-start justify-center gap-3 w-[200px]"
                  >
                    <span class="text-left">{{ cat.ctaText }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>

      <!--
             DESKTOP 
      -->
      <div
        class="hidden md:flex relative w-full max-w-[1200px] h-[400px] mx-auto flex-col items-center justify-center mb-[10px]"
      >
        <!-- Título -->
        <div class="w-full px-6">
          <h2
            ref="textTitleDesktop"
            class="font-headlines text-5xl sm:text-7xl lg:text-9xl font-light leading-[0.95] tracking-tight text-brand-terracotta/90 text-center will-change-transform"
          >
            {{ block.title }}
          </h2>
        </div>

        <div class="w-full max-w-[800px] pt-5 pb-7 px-4">
          <h3
            class="text-[20px] font-black leading-[1.8] text-brand-terracotta/90 text-center font-sans tracking-[0.02em] will-change-transform"
          >
            {{ block.subtitle }}
          </h3>
        </div>
      </div>

      <!-- CONTENEDOR GENERAL -->
      <div class="hidden md:flex w-full gap-x-3 pl-5 pr-10">
        <NuxtLink
          v-for="(cat, i) in block.categories"
          :key="cat._key"
          :to="`/${cat.slug}`"
          class="block flex-shrink-0 w-1/3"
        >
          <div
            :ref="(el) => setBoxRef(el, i)"
            class="relative h-[650px] rounded-3xl overflow-hidden group will-change-transform"
          >
            <NuxtImg
              v-if="cat.backgroundImage?.url"
              :src="cat.backgroundImage.url"
              :alt="cat.backgroundImage.alt || cat.title"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <div
              class="absolute inset-0 bg-black/25 text-white flex flex-col justify-end items-center px-6 pb-6 gap-5 group-hover:bg-black/40 transition-colors duration-500"
            >
              <h3
                class="text-4xl font-headlines tracking-wide drop-shadow-lg font-light text-center leading-tight w-[300px]"
              >
                {{ cat.title }}
              </h3>

              <span
                class="border border-white/90 px-4 py-3 rounded-full text-sm tracking-wider font-sans bg-brand-sand text-brand-terracotta flex items-center justify-center gap-3 w-[200px]"
              >
                <span class="text-left">{{ cat.ctaText }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.char-sub {
  display: inline-block;
  will-change: transform, opacity;
}

/* Optimización de rendering */
.will-change-transform {
  will-change: transform;
}
</style>
