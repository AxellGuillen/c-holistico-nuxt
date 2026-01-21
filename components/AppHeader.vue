<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useNavigation } from "@/composables/useNavigation";
import { useRoute } from "#app";

// ============================================
// STATE
// ============================================
const route = useRoute();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Links de navegación
const { links } = useNavigation();

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div class="pt-gutter md:pt-gutter-md px-gutter md:px-gutter-md">
      <!-- LAYOUT: Flex para dos contenedores lado a lado -->
      <div class="flex items-center gap-1">
        <!-- CONTENEDOR 1: Logo + Links -->
        <div
          class="flex-1 rounded-nav p-[2px] transition-all duration-300"
          :class="[
            isScrolled
              ? 'bg-nav-border-scrolled backdrop-blur-nav-scrolled shadow-nav-scrolled'
              : 'bg-nav-border backdrop-blur-nav shadow-nav',
          ]"
        >
          <nav class="rounded-nav bg-nav-bg">
            <div
              class="flex items-center h-nav-height px-nav-px lg:px-nav-px-lg"
            >
              <!-- Logo -->
              <div class="flex items-center gap-nav-gap">
                <NuxtLink to="/" class="text-nav-brand font-headlines">
                  Raíces Centro Holístico
                </NuxtLink>
                <div
                  class="hidden md:block h-5 lg:h-6 w-px bg-nav-separator"
                  aria-hidden="true"
                />
              </div>

              <!-- Links (Desktop) -->
              <div
                class="hidden md:flex flex-1 items-center gap-nav-gap-links lg:gap-nav-gap-links-lg pl-10"
              >
                <NuxtLink
                  v-for="link in links"
                  :key="link.path"
                  :to="link.path"
                  class="text-nav-link uppercase transition-colors duration-200"
                  :class="[
                    route.path.startsWith(link.path)
                      ? 'text-nav-link-active'
                      : 'hover:text-nav-link-hover',
                  ]"
                >
                  {{ link.label }}
                </NuxtLink>
              </div>

              <!-- Hamburger (Mobile) -->
              <button
                @click="toggleMobileMenu"
                class="md:hidden ml-auto p-2 text-nav-link hover:text-nav-link-hover transition-colors duration-200"
                :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
                :aria-expanded="isMobileMenuOpen"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    v-if="!isMobileMenuOpen"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>

        <!-- CONTENEDOR 2: CTA (Desktop) -->
        <div
          class="hidden md:block rounded-nav p-[2px] bg-nav-border backdrop-blur-nav shadow-nav transition-colors duration-200"
        >
          <NuxtLink
            to="/servicios"
            class="flex items-center rounded-nav bg-nav-bg hover:bg-nav-link-hover px-6 h-nav-height text-nav-cta text-nav-cta-text hover:text-nav-cta-text-hover uppercase transition-colors duration-200"
          >
            Agendar Cita
          </NuxtLink>
        </div>
      </div>

      <!-- MOBILE MENU -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden mt-2">
          <div
            class="rounded-nav-mobile bg-nav-border backdrop-blur-nav p-[2px]"
          >
            <div class="rounded-nav-mobile bg-nav-bg p-6">
              <div class="flex flex-col gap-4">
                <NuxtLink
                  v-for="link in links"
                  :key="link.path"
                  :to="link.path"
                  class="text-nav-link uppercase transition-colors duration-200"
                  :class="[
                    route.path.startsWith(link.path)
                      ? 'text-nav-link-active'
                      : 'hover:text-nav-link-hover',
                  ]"
                  @click="closeMobileMenu"
                >
                  {{ link.label }}
                </NuxtLink>
                <NuxtLink
                  to="/servicios"
                  class="text-nav-cta uppercase text-white hover:text-nav-link transition-colors duration-200"
                  @click="closeMobileMenu"
                >
                  Agendar Cita
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/*
 * ESTILOS SCOPED
 * Solo lo que Tailwind no puede expresar
 */

/* Previene artifacts de renderizado en el efecto glassmorphism */
.nav-border {
  transform: translateZ(0);
}
</style>
