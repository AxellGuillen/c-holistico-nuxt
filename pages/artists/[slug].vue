<script setup>
import { useRoute } from "#app";
import { defineAsyncComponent, computed } from "vue";

const route = useRoute();

// GROQ: layoutData ya es el bloque específico del layout seleccionado
const artistBySlug = groq`*[_type == "artist" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  layoutType,
  "layoutData": select(
    layoutType == "poetry" => layoutPoetry,
    layoutType == "gallery" => layoutGallery,
    layoutType == "videoLead" => layoutVideoLead,
    layoutType == "essay" => layoutEssay,
    layoutType == "grid" => layoutGrid,
    {}
  )
}`;

// 1) SSR-friendly: Sanity query en setup (Nuxt la ejecuta en server cuando aplica)
const {
  data: artist,
  pending,
  error,
} = useSanityQuery(artistBySlug, {
  slug: route.params.slug,
});

// 2) Mapa async: cada layout es un chunk independiente (mejor TTI)
const layoutMap = {
  poetry: defineAsyncComponent(() => import("@/components/layouts/Poetry.vue")),
  gallery: defineAsyncComponent(() =>
    import("@/components/layouts/Gallery.vue")
  ),
  videoLead: defineAsyncComponent(() =>
    import("@/components/layouts/VideoLead.vue")
  ),
  essay: defineAsyncComponent(() => import("@/components/layouts/Essay.vue")),
  grid: defineAsyncComponent(() => import("@/components/layouts/Grid.vue")),
};

// 3) Resuelve el componente según layoutType (null-safe)
const LayoutComp = computed(() => {
  const type = artist.value?.layoutType;
  return type ? layoutMap[type] ?? null : null;
});
</script>

<template>
  <div class="min-h-svh text-white">
    <div v-if="pending">Cargando…</div>
    <div v-else-if="error">Error cargando artista</div>

    <!-- Suspense para esperar el chunk del layout con un skeleton corto -->
    <Suspense v-else>
      <template #default>
        <!-- Pasa 'data' explícitamente; 'title' aparte -->
        <component
          :is="LayoutComp"
          :data="artist.layoutData"
          :title="artist.title"
        />
      </template>
      <template #fallback>
        <div class="animate-pulse h-6 w-40 bg-white/10 rounded" />
      </template>
    </Suspense>
  </div>
</template>
