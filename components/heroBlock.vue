<script setup>
import { computed, ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";

const props = defineProps(["block", "urlFor", "urlForPlaceholder"]);

const title = computed(() => props.block?.title || "");
const chars = computed(() => title.value.split(""));

const titleRefs = ref([]);

const isHovering = ref(false);

onMounted(async () => {
  await nextTick();
  gsap.from(titleRefs.value, {
    opacity: 0,
    y: 40,
    stagger: 0.04,
    ease: "power3.out",
    duration: 1.2,
  });
});
</script>

<template>
  <div
    :class="[
      ' hero-wrapper relative overflow-hidden',
      'h-[calc(100vh-64px)] md:h-screen mt-16 md:mt-0',
      isHovering ? 'blur-active' : '',
    ]"
  >
    <video
      v-if="block.backgroundVideo?.url"
      class="absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="block.backgroundVideo.url" type="video/webm" />
    </video>

    <NuxtImg
      v-else-if="block.backgroundImage?.url"
      :src="block.backgroundImage.url"
      class="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />

    <div class="hero-blur-layer absolute inset-0 z-10 pointer-events-none">
      .
    </div>

    <div
      class="absolute inset-0 flex flex-col justify-start md:justify-center z-20 md:px-[100px] text-left md:pt-20 pt-[100px]"
    >
      <div class="max-w-screen">
        <h1
          class="font-headlines font-black text-white leading-[0.9] md:text-left text-[9vw] md:text-[110px] text-center"
        >
          <span
            v-for="(char, index) in chars"
            :key="index"
            ref="titleRefs"
            class="md:inline-block will-change-transform"
          >
            {{ char === " " ? "\u00A0" : char }}
          </span>
        </h1>

        <p
          v-if="block.subtitle"
          class="md:mt-6 mt-[30px] text-white/80 font-sans text-sm text-center sm:text-lg md:text-xl md:max-w-[600px] md:text-left max-w-[250px] mx-auto md:mx-0"
        >
          {{ block.subtitle }}
        </p>

        <div
          class="md:mt-10 md:flex md:justify-start md:w-[600px] justify-center mt-[80px] flex"
        >
          <NuxtLink
            to="/contact"
            class="btn-mobile md:hidden relative inline-flex items-center h-12 px-12 rounded-full tracking-wide bg-brand-sand"
          >
            <span class="font-sans text-base text-brand-terracotta">
              Agenda tu encuentro
            </span>
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="btn-fill-hover hidden md:inline-flex relative items-center h-12 px-10 rounded-full text-white text-base tracking-wide overflow-hidden"
            @mouseenter="isHovering = true"
            @mouseleave="isHovering = false"
            @touchstart.prevent="isHovering = true"
            @touchend.prevent="isHovering = false"
            @blur="isHovering = false"
          >
            <span class="font-sans text-base text-white">
              Agenda tu encuentro
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-wrapper {
  will-change: transform, opacity;
  /* fallback gradient */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  position: relative;
}

/* BLUR LAYER - inicia sin blur */
.hero-blur-layer {
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0); /* transparente inicial */
  transition: backdrop-filter 0.8s ease, -webkit-backdrop-filter 0.8s ease,
    background 0.6s ease;
}

/* CUANDO isHovering = true se activa esta regla porque se agregó la clase .blur-active al wrapper */
.hero-wrapper.blur-active .hero-blur-layer {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  /* overlay ligero para contraste */
  background: rgba(0, 0, 0, 0.18);
}

/* H1 y botón como antes */
h1 {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  letter-spacing: -0.02em;
}

/* Botón fill */
.btn-fill-hover {
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.4);
  position: relative;
  font-weight: 500;
  z-index: 30; /* por encima del blur */
}

.btn-fill-hover::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(135deg, #fcf2ed 0%, #e1cfba 100%);
  z-index: -1;
  transition: height 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 9999px;
}

.btn-fill-hover:hover {
  border-color: #f6ccc4;
  box-shadow: 0 12px 32px rgba(246, 204, 196, 0.3);
}

.btn-fill-hover:hover::before {
  height: 100%;
}

/* color del texto en hover */
.btn-fill-hover span {
  position: relative;
  z-index: 10;
  transition: color 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-fill-hover:hover span {
  color: #3e1404;
}

/* para accesibilidad: si reduce motion, desacopla transiciones fuertes */
@media (prefers-reduced-motion: reduce) {
  .hero-blur-layer,
  .btn-fill-hover::before,
  .btn-fill-hover span {
    transition: none !important;
  }
}
</style>
