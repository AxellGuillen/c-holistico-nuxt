<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { gsap } from "gsap";
import RaicesLogo from "~/assets/icons/logo.svg";

const { isLoading, videoPreloaded, completeLoader, setHeroReady } =
  useAppLoader();

// --- Config ---
const ANIM_CONFIG = {
  rotationSpeed: 8,
  fadeDuration: 1.2,
  scaleStart: 0.85,
  textStagger: 0.2,
  minDuration: 2000, // Mínimo tiempo del loader (UX)
  maxWait: 4000, // Máximo tiempo esperando video
};

// Refs
const logo = ref(null);
const brandName = ref(null);
const tagline = ref(null);
const loaderContainer = ref(null);

let ctx;
let startTime;

onMounted(() => {
  startTime = Date.now();
  const logoEl = logo.value?.$el || logo.value;

  ctx = gsap.context(() => {
    if (logoEl) {
      gsap.set(logoEl, {
        opacity: 0,
        scale: ANIM_CONFIG.scaleStart,
        rotation: 0,
      });

      gsap.set([brandName.value, tagline.value], {
        opacity: 0,
        y: 15,
      });

      // Rotación continua
      gsap.to(logoEl, {
        rotation: 360,
        duration: ANIM_CONFIG.rotationSpeed,
        repeat: -1,
        ease: "none",
      });

      // Timeline entrada
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(logoEl, {
          opacity: 1,
          scale: 1,
          duration: ANIM_CONFIG.fadeDuration,
        })
        .to(
          [brandName.value, tagline.value],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: ANIM_CONFIG.textStagger,
          },
          "-=0.6"
        );
    }
  });

  // Timeout de seguridad (no esperar video infinitamente)
  setTimeout(finishLoader, ANIM_CONFIG.maxWait);
});

// Observar cuando el video esté precargado
watch(videoPreloaded, (ready) => {
  if (ready) {
    finishLoader();
  }
});

/**
 * Cierra el loader respetando el tiempo mínimo de UX
 */
function finishLoader() {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, ANIM_CONFIG.minDuration - elapsed);

  setTimeout(() => {
    animateOut();
  }, remaining);
}

/**
 * Animación de salida del loader
 */
function animateOut() {
  if (!loaderContainer.value) return;

  gsap.to(loaderContainer.value, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      completeLoader();
      // Pequeño delay antes de activar animaciones del Hero
      setTimeout(setHeroReady, 100);
    },
  });
}

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div
    v-if="isLoading"
    ref="loaderContainer"
    class="loader-container bg-brand-base"
  >
    <div class="loader-content">
      <div class="logo-wrapper">
        <RaicesLogo ref="logo" class="roots-icon text-brand-terracotta" />
      </div>

      <h1
        ref="brandName"
        class="brand-name font-headlines text-7xl md:text-9xl font-light leading-none mb-4 tracking-tight text-center text-brand-terracotta pt-10"
      >
        Raíces
      </h1>

      <p
        ref="tagline"
        class="tagline font-sans text-brand-terracotta/80 tracking-[0.2em] uppercase"
      >
        Centro Holístico
      </p>

      <div class="progress-bar bg-brand-soft">
        <div class="progress-fill bg-brand-terracotta"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo-wrapper {
  width: 120px;
  height: 120px;
}

.roots-icon {
  width: 100%;
  height: 100%;
}

.brand-name,
.tagline {
  margin: 0;
  opacity: 0;
}

.progress-bar {
  width: 150px;
  height: 1px;
  margin-top: 1.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 0;
  animation: progress 2.5s ease-in-out forwards;
}

@keyframes progress {
  to {
    width: 100%;
  }
}
</style>
