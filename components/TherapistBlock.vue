<script setup>
import { ref, onMounted, nextTick } from "vue";
const { $gsap, $draggable } = useNuxtApp();

const scrollContainer = ref(null);
const gridContainer = ref(null);
const textTitleMobile = ref(null);
const textTitleDesktop = ref(null);

defineProps(["block", "urlFor", "urlForPlaceholder"]);

onMounted(async () => {
  await nextTick();

  const container = scrollContainer.value;
  const grid = gridContainer.value;

  if (container && grid) {
    const maxScroll = grid.scrollWidth - container.clientWidth;

    // Configuración de física fluida tipo "gusano"
    $draggable.create(grid, {
      type: "x",
      bounds: {
        minX: -maxScroll,
        maxX: 0,
      },
      inertia: true,
      throwProps: true,

      // Configuración de física elástica
      edgeResistance: 0.65,
      throwResistance: 3000,
      overshootTolerance: 1,
      maxDuration: 1.2,
      minDuration: 0.4,

      // Suavizado extremo
      dragResistance: 0,
      velocityScale: 1.2,

      cursor: "grab",
      activeCursor: "grabbing",
      allowNativeTouchScrolling: false,
      allowContextMenu: false,
      zIndexBoost: false,

      // Aceleración por hardware
      force3D: true,

      // Easing suave para el efecto "gusano"
      ease: "power3.out",

      onPress: function () {
        // Mata cualquier animación previa para control inmediato
        $gsap.killTweensOf(grid);
        grid.style.willChange = "transform";
      },

      onDrag: function () {
        // Durante el drag, máxima fluidez
        grid.style.pointerEvents = "none";
      },

      onThrowUpdate: function () {
        // Mantiene la fluidez durante la inercia
        this.update();
      },

      onDragEnd: function () {
        grid.style.pointerEvents = "auto";

        // Animación suave al soltar con efecto elástico
        setTimeout(() => {
          grid.style.willChange = "auto";
        }, 300);
      },

      onThrowComplete: function () {
        // Reset después de la inercia
        grid.style.willChange = "auto";
      },
    });

    // Optimizaciones CSS para rendering suave
    grid.style.transform = "translate3d(0, 0, 0)";
    grid.style.backfaceVisibility = "hidden";
    grid.style.webkitBackfaceVisibility = "hidden";
    grid.style.perspective = "1000px";
    grid.style.webkitPerspective = "1000px";
    grid.style.transformStyle = "preserve-3d";

    // Smooth scrolling para rueda del mouse
    container.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          const currentX = $gsap.getProperty(grid, "x");
          const newX = Math.max(
            -maxScroll,
            Math.min(0, currentX - e.deltaX * 1.5)
          );

          $gsap.to(grid, {
            x: newX,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      },
      { passive: false }
    );
  }
});

onMounted(async () => {
  await nextTick();

  $gsap.context(() => {
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
          markers: false,
        },
      });
    }
  });
});
</script>

<template>
  <section class="therapist-section max-w-screen py-12 bg-brand-soft">
    <div
      class="md:flex relative w-full md:max-w-[1200px] h-[300px] mx-auto flex-col items-center justify-center mb-[100px] pt-[60px]"
    >
      <!-- Título -->
      <div class="w-full px-6">
        <h2
          ref="textTitleDesktop"
          class="font-headlines md:text-[150px] text-[75px] font-thin leading-[0.95] tracking-tight text-brand-terracotta/90 text-center will-change-transform"
        >
          {{ block.title }}
        </h2>
      </div>

      <div class="w-full max-w-[800px] pt-5 pb-7 px-4">
        <h3
          class="md:text-[20px] text-[10px] leading-[1.8] text-brand-terracotta/90 text-center font-sans tracking-[0.02em] will-change-transform"
        >
          {{ block.subtitle }}
        </h3>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <!-- Contenedor con scroll horizontal -->
      <div ref="scrollContainer" class="w-full overflow-hidden scrollbar-hide">
        <!-- Grid de tarjetas -->
        <div ref="gridContainer" class="inline-flex gap-4 px-4">
          <div
            v-for="therapist in block.therapists"
            :key="therapist._id"
            class="group relative w-[280px] md:w-[328px] lg:w-[390px] xl:w-[440px] aspect-[3/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
          >
            <!-- Imagen del terapeuta (50% en mobile, 80% en desktop, 50% en hover) -->
            <div
              class="absolute inset-0 h-1/2 md:h-[80%] transition-all duration-500 md:group-hover:h-1/2"
            >
              <NuxtImg
                :src="therapist.imageUrl"
                :alt="therapist.name"
                class="absolute top-0 left-0 right-0 w-full h-full object-cover object-top transition-transform duration-500 z-0 group-hover:scale-105 pointer-events-none"
              />
            </div>

            <!-- Overlay con color y info (50% en mobile, 20% en desktop, 50% en hover) -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1/2 md:h-[20%] transition-all duration-500 md:group-hover:h-1/2 flex flex-col justify-start md:justify-center px-6 py-6 md:py-4 group-hover:py-8 bg-brand-sand"
            >
              <!-- Info que aparece en hover (visible siempre en mobile) -->
              <div
                class="opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 transition-all duration-500 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0"
              >
                <h3
                  class="text-brand-terracotta font-headlines mb-3 font-thin text-[25px] md:text-[40px] leading-[0.95] tracking-tight"
                >
                  {{ therapist.name }}
                </h3>
                <p
                  class="text-brand-terracotta md:text-[13px] text-[9px] font-sans leading-relaxed"
                >
                  {{ therapist.shortBio }}
                </p>
                <p
                  class="text-brand-terracotta text-[10px] md:text-[15px] font-sans leading-relaxed pt-6 md:pt-10 font-thin"
                >
                  {{ therapist.service }}
                </p>
              </div>
            </div>

            <!-- Nombre en la parte inferior (oculto en mobile, visible en desktop hasta hover) -->
            <div
              class="hidden md:block absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 group-hover:opacity-0 bg-brand-sand"
            >
              <h3
                class="text-brand-terracotta font-headlines mb-3 font-thin text-[40px] leading-[0.95] tracking-tight"
              >
                {{ therapist.name }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
