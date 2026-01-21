<script setup>
/**
 * pages/test.vue
 *
 * Página de prueba para validar el sistema de diseño.
 * Muestra todos los tokens visuales para verificar que funcionan correctamente.
 *
 * ELIMINAR ANTES DE PRODUCCIÓN
 *
 * Uso: Navega a /test para ver todos los tokens
 */

definePageMeta({
  layout: false, // Sin layout para probar el canvas directamente
});

useHead({
  title: "Design System Test - Raíces",
  robots: "noindex, nofollow", // No indexar esta página
});

// Estados para probar interacciones
const isLoading = ref(false);
const simulateLoading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};

// Estado para verificar si los tokens están cargados
const tokensLoaded = ref(false);

onMounted(() => {
  // Verificar si los tokens nuevos existen
  const testEl = document.createElement("div");
  testEl.className = "bg-surface";
  document.body.appendChild(testEl);
  const computed = window.getComputedStyle(testEl);
  const bgColor = computed.backgroundColor;
  document.body.removeChild(testEl);

  // Si bg-surface funciona, el color no será transparent/rgba(0,0,0,0)
  tokensLoaded.value =
    bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent";
});
</script>

<template>
  <div
    class="min-h-screen"
    :class="tokensLoaded ? 'bg-surface-emphasis' : 'bg-brand-sand'"
  >
    <!-- ============================================
         BANNER DE ESTADO
         ============================================ -->
    <div
      class="fixed top-0 left-0 right-0 z-50 py-3 px-4 text-center text-sm font-medium"
      :class="
        tokensLoaded ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      "
    >
      <span v-if="tokensLoaded">
        ✅ Tokens FUNCIONANDO — El sistema de diseño está activo
      </span>
      <span v-else>
        ❌ Tokens NO CARGADOS — Necesitas actualizar tailwind.config.js
      </span>
    </div>

    <!-- ============================================
         HEADER
         ============================================ -->
    <header
      class="pt-16 pb-8 border-b"
      :class="tokensLoaded ? 'border-content/10' : 'border-brand-terracotta/10'"
    >
      <div class="max-w-5xl mx-auto px-4 md:px-8">
        <h1
          class="text-4xl md:text-5xl font-light"
          :class="
            tokensLoaded
              ? 'text-display-lg text-content'
              : 'text-brand-terracotta'
          "
        >
          Design System Test
        </h1>
        <p
          class="mt-2"
          :class="
            tokensLoaded
              ? 'text-body-md text-content-muted'
              : 'text-brand-terracotta/70'
          "
        >
          Página de validación visual de tokens. Eliminar antes de producción.
        </p>
      </div>
    </header>

    <main class="py-12 md:py-20">
      <div class="max-w-5xl mx-auto px-4 md:px-8 space-y-16 md:space-y-24">
        <!-- ============================================
             1. COLORES - SURFACE (Fondos)
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            1. Colores: Surface (Fondos)
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Surface Default -->
            <div class="space-y-3">
              <div
                class="h-32 rounded-xl flex items-center justify-center border-2"
                :class="
                  tokensLoaded
                    ? 'bg-surface border-content/20'
                    : 'bg-brand-base border-brand-terracotta/20'
                "
              >
                <span
                  class="text-sm font-medium"
                  :class="
                    tokensLoaded ? 'text-content' : 'text-brand-terracotta'
                  "
                >
                  {{ tokensLoaded ? "bg-surface" : "bg-brand-base" }}
                </span>
              </div>
              <p
                class="text-sm"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                <strong
                  :class="
                    tokensLoaded ? 'text-content' : 'text-brand-terracotta'
                  "
                  >surface</strong
                >
                — #fcf2ed <br />Fondo de página principal
              </p>
            </div>

            <!-- Surface Muted -->
            <div class="space-y-3">
              <div
                class="h-32 rounded-xl flex items-center justify-center border-2"
                :class="
                  tokensLoaded
                    ? 'bg-surface-muted border-content/20'
                    : 'bg-brand-soft border-brand-terracotta/20'
                "
              >
                <span
                  class="text-sm font-medium"
                  :class="
                    tokensLoaded ? 'text-content' : 'text-brand-terracotta'
                  "
                >
                  {{ tokensLoaded ? "bg-surface-muted" : "bg-brand-soft" }}
                </span>
              </div>
              <p
                class="text-sm"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                <strong
                  :class="
                    tokensLoaded ? 'text-content' : 'text-brand-terracotta'
                  "
                  >surface-muted</strong
                >
                — #f0e7da <br />Fondos de cards, secciones
              </p>
            </div>

            <!-- Surface Emphasis -->
            <div class="space-y-3">
              <div
                class="h-32 rounded-xl flex items-center justify-center border-2"
                :class="
                  tokensLoaded
                    ? 'bg-surface-emphasis border-content/20'
                    : 'bg-brand-sand border-brand-terracotta/20'
                "
              >
                <span
                  class="text-sm font-medium"
                  :class="
                    tokensLoaded ? 'text-content' : 'text-brand-terracotta'
                  "
                >
                  {{ tokensLoaded ? "bg-surface-emphasis" : "bg-brand-sand" }}
                </span>
              </div>
              <p
                class="text-sm"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                <strong
                  :class="
                    tokensLoaded ? 'text-content' : 'text-brand-terracotta'
                  "
                  >surface-emphasis</strong
                >
                — #e1cfba <br />Canvas, navbar, overlays
              </p>
            </div>
          </div>
        </section>

        <!-- ============================================
             2. COLORES - CONTENT (Texto)
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            2. Colores: Content (Texto)
          </h2>

          <div
            class="p-8 rounded-xl space-y-6"
            :class="tokensLoaded ? 'bg-surface-muted' : 'bg-brand-soft'"
          >
            <div>
              <p
                class="text-xl"
                :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
              >
                {{ tokensLoaded ? "text-content" : "text-brand-terracotta" }} —
                Texto principal (100%)
              </p>
            </div>

            <div>
              <p
                class="text-xl"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                {{
                  tokensLoaded
                    ? "text-content-muted"
                    : "text-brand-terracotta/70"
                }}
                — Texto secundario (70%)
              </p>
            </div>

            <div>
              <p
                class="text-xl"
                :class="
                  tokensLoaded
                    ? 'text-content-subtle'
                    : 'text-brand-terracotta/40'
                "
              >
                {{
                  tokensLoaded
                    ? "text-content-subtle"
                    : "text-brand-terracotta/40"
                }}
                — Texto terciario (40%)
              </p>
            </div>
          </div>
        </section>

        <!-- ============================================
             3. COLORES - ACCENT (Énfasis)
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            3. Colores: Accent (Énfasis)
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="h-24 rounded-xl flex items-center justify-center"
              :class="tokensLoaded ? 'bg-accent' : 'bg-brand-earth'"
            >
              <span class="text-white font-medium">
                {{ tokensLoaded ? "bg-accent" : "bg-brand-earth" }} — #bf9770
              </span>
            </div>

            <div
              class="h-24 rounded-xl flex items-center justify-center"
              :class="tokensLoaded ? 'bg-accent-soft' : 'bg-brand-blush'"
            >
              <span
                :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
                class="font-medium"
              >
                {{ tokensLoaded ? "bg-accent-soft" : "bg-brand-blush" }} —
                #f6ccc4
              </span>
            </div>
          </div>

          <div
            class="mt-6 p-6 rounded-xl"
            :class="tokensLoaded ? 'bg-surface' : 'bg-brand-base'"
          >
            <p
              :class="
                tokensLoaded ? 'text-content-muted' : 'text-brand-terracotta/70'
              "
            >
              <strong
                :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
                >Prueba de selection:</strong
              >
              Selecciona este texto para ver el color accent-soft en acción.
              (Solo funciona si actualizaste main.css)
            </p>
          </div>
        </section>

        <!-- ============================================
             4. TIPOGRAFÍA
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            4. Tipografía Semántica
          </h2>

          <div
            class="p-8 rounded-xl space-y-6"
            :class="tokensLoaded ? 'bg-surface-muted' : 'bg-brand-soft'"
          >
            <!-- Solo muestra si los tokens están cargados -->
            <template v-if="tokensLoaded">
              <p class="text-display-hero text-content font-headlines">
                Display Hero
              </p>
              <p class="text-display-xl text-content font-headlines">
                Display XL
              </p>
              <p class="text-display-lg text-content font-headlines">
                Display LG
              </p>
              <p class="text-display-md text-content font-headlines">
                Display MD
              </p>
              <hr class="border-content/10 my-6" />
              <p class="text-heading-lg text-content">Heading LG (24px)</p>
              <p class="text-heading-md text-content">Heading MD (20px)</p>
              <hr class="border-content/10 my-6" />
              <p class="text-body-lg text-content">Body LG — Texto destacado</p>
              <p class="text-body-md text-content">Body MD — Texto normal</p>
              <p class="text-body-sm text-content">Body SM — Captions</p>
            </template>

            <template v-else>
              <p class="text-6xl text-brand-terracotta font-headlines">
                Display (sin tokens)
              </p>
              <p class="text-4xl text-brand-terracotta font-headlines">
                Display LG
              </p>
              <p class="text-2xl text-brand-terracotta font-headlines">
                Display MD
              </p>
              <hr class="border-brand-terracotta/10 my-6" />
              <p class="text-xl text-brand-terracotta">Heading (tamaño fijo)</p>
              <p class="text-lg text-brand-terracotta">Heading MD</p>
              <hr class="border-brand-terracotta/10 my-6" />
              <p class="text-base text-brand-terracotta">Body — Texto normal</p>
              <p class="text-sm text-brand-terracotta">Body SM — Captions</p>
              <p class="text-red-500 mt-4 font-medium">
                ⚠️ Los tokens de tipografía no están cargados. Actualiza
                tailwind.config.js
              </p>
            </template>
          </div>
        </section>

        <!-- ============================================
             5. SPACING DE SECCIONES
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            5. Spacing de Secciones
          </h2>

          <div class="space-y-4">
            <div
              class="rounded-xl overflow-hidden"
              :class="tokensLoaded ? 'bg-surface-muted' : 'bg-brand-soft'"
            >
              <div
                class="flex items-center justify-center"
                :class="[
                  tokensLoaded
                    ? 'py-section-sm bg-accent/20'
                    : 'py-12 bg-brand-earth/20',
                  tokensLoaded ? 'text-content' : 'text-brand-terracotta',
                ]"
              >
                {{
                  tokensLoaded ? "py-section-sm (48px)" : "py-12 (48px aprox)"
                }}
              </div>
            </div>

            <div
              class="rounded-xl overflow-hidden"
              :class="tokensLoaded ? 'bg-surface-muted' : 'bg-brand-soft'"
            >
              <div
                class="flex items-center justify-center"
                :class="[
                  tokensLoaded
                    ? 'py-section-md bg-accent/30'
                    : 'py-20 bg-brand-earth/30',
                  tokensLoaded ? 'text-content' : 'text-brand-terracotta',
                ]"
              >
                {{
                  tokensLoaded ? "py-section-md (80px)" : "py-20 (80px aprox)"
                }}
              </div>
            </div>

            <div
              class="rounded-xl overflow-hidden"
              :class="tokensLoaded ? 'bg-surface-muted' : 'bg-brand-soft'"
            >
              <div
                class="flex items-center justify-center"
                :class="[
                  tokensLoaded
                    ? 'py-section-lg bg-accent/40'
                    : 'py-28 bg-brand-earth/40',
                  tokensLoaded ? 'text-content' : 'text-brand-terracotta',
                ]"
              >
                {{
                  tokensLoaded ? "py-section-lg (112px)" : "py-28 (112px aprox)"
                }}
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================
             6. SOMBRAS
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            6. Sombras
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              class="p-6 rounded-xl text-center"
              :class="[
                tokensLoaded
                  ? 'bg-surface shadow-soft'
                  : 'bg-brand-base shadow-sm',
                tokensLoaded ? 'text-content' : 'text-brand-terracotta',
              ]"
            >
              {{ tokensLoaded ? "shadow-soft" : "shadow-sm" }}
            </div>
            <div
              class="p-6 rounded-xl text-center"
              :class="[
                tokensLoaded
                  ? 'bg-surface shadow-medium'
                  : 'bg-brand-base shadow-md',
                tokensLoaded ? 'text-content' : 'text-brand-terracotta',
              ]"
            >
              {{ tokensLoaded ? "shadow-medium" : "shadow-md" }}
            </div>
            <div
              class="p-6 rounded-xl text-center"
              :class="[
                tokensLoaded
                  ? 'bg-surface shadow-strong'
                  : 'bg-brand-base shadow-lg',
                tokensLoaded ? 'text-content' : 'text-brand-terracotta',
              ]"
            >
              {{ tokensLoaded ? "shadow-strong" : "shadow-lg" }}
            </div>
            <div
              class="p-6 rounded-xl text-center"
              :class="[
                tokensLoaded
                  ? 'bg-surface shadow-glow'
                  : 'bg-brand-base shadow-xl',
                tokensLoaded ? 'text-content' : 'text-brand-terracotta',
              ]"
            >
              {{ tokensLoaded ? "shadow-glow" : "shadow-xl" }}
            </div>
          </div>
        </section>

        <!-- ============================================
             7. BOTONES
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            7. Botones (Hover para probar)
          </h2>

          <div class="flex flex-wrap gap-4">
            <div
              class="hidden md:block rounded-nav p-[2px] bg-nav-border backdrop-blur-nav shadow-nav transition-colors duration-200"
            >
              <NuxtLink
                to="/contact"
                class="flex items-center rounded-nav bg-nav-bg hover:bg-nav-link-hover px-6 h-nav-height text-nav-cta text-nav-cta-text hover:text-nav-cta-text-hover uppercase transition-colors duration-200"
              >
                Agendar Cita
              </NuxtLink>
            </div>

            <!-- Primary -->
            <button
              class="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium transition-all duration-300 border-2"
              :class="
                tokensLoaded
                  ? 'bg-surface-emphasis text-content border-content/20 hover:border-content hover:shadow-medium'
                  : 'bg-brand-sand text-brand-terracotta border-brand-terracotta/20 hover:border-brand-terracotta hover:shadow-lg'
              "
            >
              Primary
            </button>

            <!-- Secondary -->
            <button
              class="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium transition-all duration-300 border"
              :class="
                tokensLoaded
                  ? 'bg-surface-muted text-content border-content/10 hover:bg-surface hover:border-content/20'
                  : 'bg-brand-soft text-brand-terracotta border-brand-terracotta/10 hover:bg-brand-base'
              "
            >
              Secondary
            </button>

            <!-- Outline -->
            <button
              class="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium transition-all duration-300 bg-transparent border-2"
              :class="
                tokensLoaded
                  ? 'text-content border-content/30 hover:border-content hover:bg-content/5'
                  : 'text-brand-terracotta border-brand-terracotta/30 hover:border-brand-terracotta'
              "
            >
              Outline
            </button>

            <!-- Ghost -->
            <button
              class="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium transition-all duration-300"
              :class="
                tokensLoaded
                  ? 'text-content hover:bg-content/10'
                  : 'text-brand-terracotta hover:bg-brand-terracotta/10'
              "
            >
              Ghost
            </button>

            <!-- Loading Test -->
            <button
              @click="simulateLoading"
              :disabled="isLoading"
              class="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium transition-all duration-300 border-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="
                tokensLoaded
                  ? 'bg-surface-emphasis text-content border-content/20 hover:border-content'
                  : 'bg-brand-sand text-brand-terracotta border-brand-terracotta/20'
              "
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? "Cargando..." : "Test Loading" }}
            </button>
          </div>
        </section>

        <!-- ============================================
             8. EJEMPLO DE CARD
             ============================================ -->
        <section>
          <h2
            class="text-2xl md:text-3xl font-medium mb-8"
            :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
          >
            8. Ejemplo: Card con Jerarquía
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              class="p-6 rounded-xl transition-shadow cursor-pointer"
              :class="
                tokensLoaded
                  ? 'bg-surface-muted shadow-soft hover:shadow-medium'
                  : 'bg-brand-soft shadow-sm hover:shadow-md'
              "
            >
              <span
                class="text-xs uppercase tracking-wider font-semibold"
                :class="tokensLoaded ? 'text-accent' : 'text-brand-earth'"
              >
                Categoría
              </span>
              <h3
                class="text-xl font-semibold mt-2"
                :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
              >
                Título del Card
              </h3>
              <p
                class="mt-2"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                Descripción secundaria que complementa el título.
              </p>
              <span
                class="text-sm block mt-4"
                :class="
                  tokensLoaded
                    ? 'text-content-subtle'
                    : 'text-brand-terracotta/40'
                "
              >
                Metadata · 4 ene 2026
              </span>
            </article>

            <article
              class="p-6 rounded-xl transition-shadow cursor-pointer"
              :class="
                tokensLoaded
                  ? 'bg-surface-muted shadow-soft hover:shadow-medium'
                  : 'bg-brand-soft shadow-sm hover:shadow-md'
              "
            >
              <span
                class="text-xs uppercase tracking-wider font-semibold"
                :class="tokensLoaded ? 'text-accent' : 'text-brand-earth'"
              >
                Categoría
              </span>
              <h3
                class="text-xl font-semibold mt-2"
                :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
              >
                Segundo Card
              </h3>
              <p
                class="mt-2"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                Otro ejemplo para ver la consistencia visual.
              </p>
              <span
                class="text-sm block mt-4"
                :class="
                  tokensLoaded
                    ? 'text-content-subtle'
                    : 'text-brand-terracotta/40'
                "
              >
                Metadata · 4 ene 2026
              </span>
            </article>

            <article
              class="p-6 rounded-xl transition-shadow cursor-pointer"
              :class="
                tokensLoaded
                  ? 'bg-surface-muted shadow-soft hover:shadow-medium'
                  : 'bg-brand-soft shadow-sm hover:shadow-md'
              "
            >
              <span
                class="text-xs uppercase tracking-wider font-semibold"
                :class="tokensLoaded ? 'text-accent' : 'text-brand-earth'"
              >
                Categoría
              </span>
              <h3
                class="text-xl font-semibold mt-2"
                :class="tokensLoaded ? 'text-content' : 'text-brand-terracotta'"
              >
                Tercer Card
              </h3>
              <p
                class="mt-2"
                :class="
                  tokensLoaded
                    ? 'text-content-muted'
                    : 'text-brand-terracotta/70'
                "
              >
                Los tres cards deberían verse iguales.
              </p>
              <span
                class="text-sm block mt-4"
                :class="
                  tokensLoaded
                    ? 'text-content-subtle'
                    : 'text-brand-terracotta/40'
                "
              >
                Metadata · 4 ene 2026
              </span>
            </article>
          </div>
        </section>

        <!-- ============================================
             9. INSTRUCCIONES
             ============================================ -->
        <section
          class="p-8 rounded-xl"
          :class="
            tokensLoaded
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          "
        >
          <h2
            class="text-xl font-semibold mb-4"
            :class="tokensLoaded ? 'text-green-800' : 'text-red-800'"
          >
            {{ tokensLoaded ? "✅ Sistema Activo" : "❌ Acción Requerida" }}
          </h2>

          <div v-if="!tokensLoaded" class="text-red-700 space-y-4">
            <p class="font-medium">Para activar el sistema de diseño:</p>
            <ol class="list-decimal list-inside space-y-2 ml-4">
              <li>
                Descarga el archivo
                <code class="bg-red-100 px-2 py-1 rounded"
                  >tailwind.config.js</code
                >
                que te proporcioné
              </li>
              <li>Reemplaza tu archivo actual en la raíz del proyecto</li>
              <li>
                Reinicia el servidor de desarrollo:
                <code class="bg-red-100 px-2 py-1 rounded">npm run dev</code>
              </li>
              <li>Recarga esta página</li>
            </ol>
            <p class="mt-4 text-sm">
              El banner superior debería cambiar de rojo a verde cuando los
              tokens estén activos.
            </p>
          </div>

          <div v-else class="text-green-700 space-y-4">
            <p>¡Todos los tokens están funcionando correctamente!</p>
            <p class="font-medium">Verificaciones completadas:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Colores semánticos (surface, content, accent)</li>
              <li>Escala tipográfica (display, heading, body)</li>
              <li>Spacing de secciones (section-sm, md, lg)</li>
              <li>Sombras personalizadas</li>
              <li>Transiciones y hover states</li>
            </ul>
            <p class="mt-4 font-medium">
              Siguiente paso: Crear el layout principal (layouts/default.vue)
            </p>
          </div>
        </section>
      </div>
    </main>

    <!-- ============================================
         FOOTER
         ============================================ -->
    <footer
      class="py-8 border-t mt-16"
      :class="tokensLoaded ? 'border-content/10' : 'border-brand-terracotta/10'"
    >
      <div class="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <p
          class="text-sm"
          :class="
            tokensLoaded ? 'text-content-subtle' : 'text-brand-terracotta/40'
          "
        >
          Esta página es solo para desarrollo. Eliminar antes de producción.
        </p>
        <NuxtLink
          to="/"
          class="text-sm mt-2 inline-block transition-colors"
          :class="
            tokensLoaded
              ? 'text-content hover:text-accent'
              : 'text-brand-terracotta hover:text-brand-earth'
          "
        >
          ← Volver al Home
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>
