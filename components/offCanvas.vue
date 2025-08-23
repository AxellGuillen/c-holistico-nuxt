<!-- components/OffPush.vue -->

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";

const store = useOffCanvasStore();
const panelEl = ref(null);
const visible = ref(false);

const MAIN = "#main-wrapper"; // objetivo a empujar
const ROOT = "#app-shell"; // donde está --drawer-w

function getDrawerPx() {
  if (!import.meta.client) return 0;
  const root = document.querySelector(ROOT);
  if (!root) return 0;
  const raw = getComputedStyle(root).getPropertyValue("--drawer-w").trim();
  // Soporta '360px' → 360
  const px = parseFloat(raw || "0");
  return isNaN(px) ? 0 : px;
}

function openAnim() {
  const w = getDrawerPx();
  // estados iniciales
  gsap.set(panelEl.value, { xPercent: 100 });
  gsap.set(MAIN, { x: 0, scale: 1 });

  // animaciones en paralelo (panel entra, main se mueve)
  gsap.to(panelEl.value, { xPercent: 0, duration: 0.3, ease: "power3.out" });
  gsap.to(MAIN, { x: -w, scale: 0.995, duration: 0.3, ease: "power3.out" });
}

function closeAnim() {
  getDrawerPx();
  gsap.to(panelEl.value, {
    xPercent: 100,
    duration: 0.26,
    ease: "power3.in",
    onComplete: () => {
      visible.value = false;
    },
  });
  gsap.to(MAIN, { x: 0, scale: 1, duration: 0.26, ease: "power3.in" });
}

function onKey(e) {
  if (e.key === "Escape" && store.isOpen) store.close();
}

onMounted(() => {
  watch(
    () => store.isOpen,
    async (open) => {
      if (open) {
        visible.value = true;
        await nextTick();
        openAnim();
      } else if (visible.value) {
        closeAnim();
      }
    }
  );

  window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <!-- Panel (entra desde la derecha; empuja el contenido) -->
  <aside
    v-show="visible"
    ref="panelEl"
    class="fixed top-0 right-0 h-svh z-[70] transform-gpu will-change-transform bg-black text-neutral-100 border-l border-white/10 shadow-2xl w-[var(--drawer-w)] flex flex-col"
  >
    <header
      class="h-14 flex items-center justify-between px-4 border-b border-white/10"
    >
      <h2
        id="offpushTitle"
        class="text-sm font-semibold tracking-wide uppercase"
      >
        Artist
      </h2>
    </header>

    <div class="flex-1 overflow-y-auto p-4 space-y-3 uppercase text-white">
      <div>
        <p class="text-xs/6">Laureana Toledo</p>
        <p class="text-xs/6">Lucia Serrano</p>
        <p class="text-xs/6">Milton Fajer</p>
        <p class="text-xs/6">Danna Gonzalez</p>

        <p class="text-xs/6">Britney Trejo</p>
        <p class="text-xs/6">Charruan Pereztroika</p>
      </div>
    </div>
    <button
      class="inline-flex h-9 px-3 items-center justify-center rounded-md bg-white/10 hover:bg-white/20"
      @click="store.close()"
    >
      ✕
    </button>
  </aside>
</template>
