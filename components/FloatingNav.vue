<!-- components/FloatingFooter.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  links: { type: Array, required: true },
});

const dock = ref(null);
const VISIBLE_INIT = true;
const HIDE_AFTER_MS = 2400;
let hideTimer = null;
let isVisible = VISIBLE_INIT;

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

function clearHideTimer() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function queueHide() {
  clearHideTimer();
  hideTimer = setTimeout(() => {
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

function onMouseMove() {
  showDock();
  queueHide();
}

function onKeyDown(e) {
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
  gsap.set(dock.value, {
    autoAlpha: VISIBLE_INIT ? 1 : 0,
    y: VISIBLE_INIT ? 0 : 12,
  });

  const prefersReduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduce) {
    gsap.set(dock.value, { clearProps: "all", opacity: 1, y: 0 });
    isVisible = true;
    return;
  }

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("touchstart", onTouchStart, { passive: true });

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
  <nav
    ref="dock"
    role="navigation"
    class="fixed left-1/2 -translate-x-1/2 z-50"
    :style="{ top: 'calc(env(safe-area-inset-top, 0px) + 16px)' }"
    @mouseenter="pauseHide"
    @mouseleave="queueHide"
  >
    <div>
      <div
        class="flex justify-center items-center gap-6 md:gap-20 md:justify-start"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm md:text-base font-sans uppercase outline-none bg-gradient-to-br from-brand-accent1/90 via-brand-accent2/80 to-brand-secondary/80"
        >
          <span class="translate-y-[0.5px] text-brand-background">
            {{ link.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  contain: layout style;
  will-change: transform, opacity;
}
</style>
