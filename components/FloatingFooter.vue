<!-- components/FloatingFooter.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  links: { type: Array, required: true },
});

const dock = ref(null); // elemento del nav
const VISIBLE_INIT = true; // visible al cargar
const HIDE_AFTER_MS = 2400; // tiempo de inactividad antes de ocultar
let hideTimer = null; // id del timeout
let isVisible = VISIBLE_INIT; // estado interno (sin reactividad, lo controla GSAP)

// Animaciones GSAP (show/hide)
function showDock() {
  if (isVisible) return;
  isVisible = true;
  gsap.killTweensOf(dock.value);
  gsap.to(dock.value, {
    autoAlpha: 1,
    duration: 0.45,
    ease: "power2.out",
  });
}

function hideDock() {
  if (!isVisible) return;
  isVisible = false;
  gsap.killTweensOf(dock.value);
  gsap.to(dock.value, {
    autoAlpha: 0,
    duration: 0.35,
    ease: "power2.inOut",
  });
}

// Timers
function clearHideTimer() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function queueHide() {
  clearHideTimer();
  hideTimer = setTimeout(() => {
    // Si el foco está dentro del dock (teclado), no ocultar
    const active = document.activeElement;
    if (active && active.closest && active.closest("nav") === dock.value) {
      queueHide();
      return;
    }
    hideDock();
  }, HIDE_AFTER_MS);
}

function pauseHide() {
  clearHideTimer();
}

// Listeners de interacción
function onMouseMove() {
  showDock();
  queueHide();
}

function onKeyDown(e) {
  // Tab => mostrar (accesibilidad), Escape => ocultar
  if (e.key === "Tab") {
    showDock();
    queueHide();
  }
  if (e.key === "Escape") hideDock();
}

function onTouchStart() {
  showDock();
  queueHide();
}

onMounted(() => {
  // Estado inicial: visible u oculto
  gsap.set(dock.value, {
    autoAlpha: VISIBLE_INIT ? 1 : 0,
    y: VISIBLE_INIT ? 0 : 12,
  });

  // Respeta prefers-reduced-motion
  const prefersReduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduce) {
    gsap.set(dock.value, { clearProps: "all", opacity: 1, y: 0 });
    isVisible = true;
    return;
  }

  // Eventos globales
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("touchstart", onTouchStart, { passive: true });

  // Programa ocultamiento inicial si arrancó visible
  if (VISIBLE_INIT) queueHide();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("touchstart", onTouchStart);
  clearHideTimer();
});
</script>

<template>
  <!-- role=navigation para accesibilidad -->
  <nav
    ref="dock"
    role="navigation"
    class="fixed left-1/2 -translate-x-1/2 z-50"
    :style="{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }"
    @mouseenter="pauseHide"
    @mouseleave="queueHide"
  >
    <div>
      <div class="flex items-center md:gap-20">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm md:text-base font-sans uppercase outline-none transition-colors duration-200 ease-out text-white hover:text-black hover:bg-white focus:bg-white focus-visible:ring-2 focus-visible:ring-white/60 focus:text-black"
        >
          <span class="translate-y-[0.5px]">{{ link.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Evita reflujo en tooltips/blur y mejora rendimiento */
nav {
  contain: layout style;
  will-change: transform, opacity;
}
</style>
