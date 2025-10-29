<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

defineProps(["block", "urlFor", "urlForPlaceholder"]);

gsap.registerPlugin(ScrollTrigger);

const textTitle = ref(null);
const boxes = ref([]); //
let ctx = null;

// ✅ Función para setear los refs
const setBoxRef = (el, index) => {
  if (el) {
    boxes.value[index] = el;
  }
};

onMounted(async () => {
  await nextTick();

  ctx = gsap.context(() => {
    // Animación del título
    if (textTitle.value) {
      gsap.from(textTitle.value, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textTitle.value,
          start: "top 80%",
          toggleActions: "play none none none",
          markers: true,
        },
      });
    }

    boxes.value.forEach((card, index) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
          markers: true,
        },
      });
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
  boxes.value = [];
});
</script>

<template>
  <section class="py-1 md:py-24">
    <div class="max-w-[1600px] mx-auto px-4">
      <ClientOnly>
        <div class="md:hidden">
          <div class="text-center font-headlines mb-8">
            <h2 class="text-6xl font-light mb-3" ref="textTitle">
              {{ block.title }}
            </h2>
          </div>

          <!-- ✅ Flex con gap -->
          <div class="flex flex-col gap-6">
            <NuxtLink
              v-for="(cat, i) in block.categories"
              :key="cat._key"
              :to="`/${cat.slug}`"
              class="block"
            >
              <!-- ✅ Nota: agregué 'block' al NuxtLink -->
              <div
                :ref="(el) => setBoxRef(el, i)"
                class="relative h-[550px] overflow-hidden rounded-3xl group"
              >
                <NuxtImg
                  v-if="cat.backgroundImage?.url"
                  :src="cat.backgroundImage.url"
                  :alt="cat.backgroundImage.alt || cat.title"
                  class="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  class="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30 group-hover:bg-black/40 transition-colors duration-500"
                >
                  <h3 class="text-2xl font-bold mb-3 font-sans">
                    {{ cat.title }}
                  </h3>
                  <span
                    class="border border-white px-4 py-2 rounded-full text-sm tracking-wide font-sans backdrop-blur-sm"
                  >
                    {{ cat.ctaText }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>
