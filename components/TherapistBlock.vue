<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
const { $gsap, $draggable } = useNuxtApp();

const scrollContainer = ref(null);
const gridContainer = ref(null);
const textTitleDesktop = ref(null);

let draggableInstance = null;
let wheelHandler = null;

defineProps(["block", "urlFor", "urlForPlaceholder"]);

onMounted(async () => {
  await nextTick();

  const container = scrollContainer.value;
  const grid = gridContainer.value;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!container || !grid) return;

  // --- MOBILE: Use native CSS scroll-snap for best performance ---
  if (isMobile) {
    container.style.overflowX = "auto";
    container.style.scrollSnapType = "x mandatory";
    container.style.scrollBehavior = "smooth";
    container.style.webkitOverflowScrolling = "touch"; // Smoother iOS scroll

    const cards = grid.querySelectorAll(":scope > div");
    cards.forEach((card) => {
      card.style.scrollSnapAlign = "center";
    });
    return; // Exit, no GSAP needed
  }

  // --- DESKTOP: Use GSAP Draggable with snapping ---
  const cards = grid.querySelectorAll(":scope > div");
  const cardWidth = cards[0]?.offsetWidth || 400;
  const gap = 16; // gap-4 = 16px
  const snapStep = cardWidth + gap;
  const maxScroll = grid.scrollWidth - container.clientWidth;

  // Create snap points for each card position
  const snapPoints = [];
  for (let i = 0; i * snapStep <= maxScroll; i++) {
    snapPoints.push(-i * snapStep);
  }

  draggableInstance = $draggable.create(grid, {
    type: "x",
    bounds: { minX: -maxScroll, maxX: 0 },
    inertia: true,
    edgeResistance: 0.8,
    throwResistance: 2000,
    maxDuration: 0.8,
    minDuration: 0.3,
    cursor: "grab",
    activeCursor: "grabbing",
    force3D: true,
    allowNativeTouchScrolling: true, // Don't block vertical scroll
    snap: {
      x: function (endValue) {
        // Find closest snap point
        return snapPoints.reduce((prev, curr) =>
          Math.abs(curr - endValue) < Math.abs(prev - endValue) ? curr : prev
        );
      },
    },
    onPress: function () {
      $gsap.killTweensOf(grid);
    },
  })[0];

  // Mouse wheel scrolling
  wheelHandler = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      const currentX = $gsap.getProperty(grid, "x");
      const delta = e.shiftKey ? e.deltaY : e.deltaX;
      let newX = currentX - delta * 1.5;

      // Clamp and snap
      newX = Math.max(-maxScroll, Math.min(0, newX));
      const snappedX = snapPoints.reduce((prev, curr) =>
        Math.abs(curr - newX) < Math.abs(prev - newX) ? curr : prev
      );

      $gsap.to(grid, {
        x: snappedX,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };
  container.addEventListener("wheel", wheelHandler, { passive: false });
});

// GSAP animation for the title
onMounted(async () => {
  await nextTick();
  if (textTitleDesktop.value) {
    $gsap.from(textTitleDesktop.value, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textTitleDesktop.value,
        start: "top 85%",
        once: true,
      },
    });
  }
});

onUnmounted(() => {
  if (draggableInstance) {
    draggableInstance.kill();
  }
  if (wheelHandler && scrollContainer.value) {
    scrollContainer.value.removeEventListener("wheel", wheelHandler);
  }
});
</script>

<template>
  <section class="py-20 md:py-28 bg-brand-soft overflow-hidden">
    <!-- Header -->
    <div class="container mx-auto px-4 mb-12 md:mb-16 text-center">
      <h2
        ref="textTitleDesktop"
        class="font-headlines text-5xl md:text-8xl lg:text-[120px] text-brand-terracotta leading-none tracking-tight"
      >
        {{ block.title }}
      </h2>
      <p
        v-if="block.subtitle"
        class="mt-4 md:mt-6 text-base md:text-lg text-brand-terracotta/70 max-w-2xl mx-auto font-sans"
      >
        {{ block.subtitle }}
      </p>
    </div>

    <!-- Carousel Container -->
    <div
      ref="scrollContainer"
      class="w-full overflow-x-auto md:overflow-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
    >
      <div ref="gridContainer" class="inline-flex gap-4 px-4 md:px-8 pb-4">
        <article
          v-for="therapist in block.therapists"
          :key="therapist._id"
          class="group relative w-[85vw] max-w-[320px] md:w-[380px] lg:w-[420px] aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0 bg-brand-sand shadow-lg transition-all duration-300 hover:shadow-2xl"
        >
          <!-- Image (top portion) -->
          <div
            class="absolute top-0 left-0 right-0 h-[55%] md:h-[65%] transition-all duration-500 ease-out md:group-hover:h-[50%] overflow-hidden"
          >
            <NuxtImg
              :src="therapist.imageUrl"
              :alt="therapist.name"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              loading="lazy"
            />
          </div>

          <!-- Info Overlay (bottom portion) -->
          <div
            class="absolute bottom-0 left-0 right-0 h-[45%] md:h-[35%] transition-all duration-500 ease-out md:group-hover:h-[50%] bg-brand-sand flex flex-col justify-center px-5 py-4 md:px-6"
          >
            <!-- Name -->
            <h3
              class="text-brand-terracotta font-headlines text-2xl md:text-3xl leading-tight tracking-tight mb-2"
            >
              {{ therapist.name }}
            </h3>

            <!-- Bio (always visible on mobile, fade-in on desktop hover) -->
            <p
              class="text-brand-terracotta/80 text-sm font-sans leading-relaxed line-clamp-3 md:opacity-0 md:translate-y-2 transition-all duration-400 ease-out md:group-hover:opacity-100 md:group-hover:translate-y-0"
            >
              {{ therapist.shortBio }}
            </p>

            <!-- Service Tag -->
            <p
              v-if="therapist.service"
              class="mt-3 text-xs font-medium text-brand-earth uppercase tracking-wider"
            >
              {{ therapist.service }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

