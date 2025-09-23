<script setup>
import groq from "groq";
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import ArtistList from "./sidebar/ArtistList.vue";
import { list } from "postcss";

const router = useRouter();

const artistList = groq`*[_type == "artist"] | order(orderRank) {
  title,
  "slug": slug.current
}`;
const { data: artists, pending, error } = useSanityQuery(artistList);

// OffCanvas store
const store = useOffCanvasStore();
const panelEl = ref(null);
const visible = ref(false);

const MAIN = "#main-wrapper";
const ROOT = "#app-shell";

function getDrawerPx() {
  if (!import.meta.client) return 0;
  const root = document.querySelector(ROOT);
  if (!root) return 0;
  const raw = getComputedStyle(root).getPropertyValue("--drawer-w").trim();
  const px = parseFloat(raw || "0");
  return isNaN(px) ? 0 : px;
}

function openAnim() {
  const w = getDrawerPx();
  gsap.set(panelEl.value, { xPercent: 100 });
  gsap.set(MAIN, { x: 0, scale: 1 });
  gsap.to(panelEl.value, { xPercent: 0, duration: 0.3, ease: "power3.out" });
  gsap.to(MAIN, { x: -w, scale: 0.995, duration: 0.3, ease: "power3.out" });
}

function closeAnim() {
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

async function openArtist(slug) {
  await router.push(`/artists/${slug}`);
  store.close();
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
    },
    { immediate: true }
  );
  window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <aside
    v-show="visible"
    ref="panelEl"
    class="fixed top-0 right-0 h-svh z-[70] transform-gpu will-change-transform text-neutral-100 border-l border-white/10 shadow-2xl w-[var(--drawer-w)] flex flex-col"
  >
    <header
      class="h-14 flex items-center justify-between px-4 border-b border-white/10"
    >
      <h2 class="text-[50px] font-semibold tracking-wide uppercase pt-2">
        Artists
      </h2>
    </header>

    <div class="flex-1 overflow-y-auto p-4 space-y-3 uppercase text-white">
      <div v-if="list">
        <ArtistList :list="artists" @select="openArtist" />
      </div>
      <div v-else-if="pending">Cargando…</div>
      <div v-else-if="error">Error cargando artistas</div>
    </div>
  </aside>
</template>
