<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "#app";

import Logo from "~/assets/icons/logo.svg?component";
import { gsap } from "gsap";

const { links } = useNavigation();
const route = useRoute();

const nav = ref(null);
const logo = ref(null);
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const isServicePage = computed(() => {
  return route.path.startsWith("/servicios");
});

const isAboutPage = computed(() => {
  return route.path.startsWith("/about");
});

const isQuizPage = computed(() => {
  return route.path.startsWith("/quiz");
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
    document.body.style.overflow = "";
  }
);

let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.scrollY;

  // Cambiar el estado de isScrolled basado en la posición
  isScrolled.value = currentScroll > 50;

  // Ocultar/mostrar navbar al hacer scroll, pero NO si el menu está abierto
  if (isMenuOpen.value) {
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 50) {
    gsap.to(nav.value, {
      y: -100,
      duration: 1.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  } else {
    gsap.to(nav.value, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto", // Added overwrite to be safe
    });
  }

  lastScroll = currentScroll;
}

onMounted(() => {
  gsap.from(logo.value.$el, {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 6,
    repeat: -1,
    ease: "none",
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = ""; // Ensure cleanup
});
</script>

<template>
  <header ref="nav" class="fixed inset-x-0 top-0 z-50 font-sans font-bold">
    <nav
      :class="[
        'relative flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-xs sm:text-sm text-white tracking-wide w-full border-b transition-all duration-700 ease-out ',
        isMenuOpen ? 'bg-brand-sand border-transparent' : '',
        !isMenuOpen && (isServicePage || isAboutPage || isQuizPage)
          ? 'bg-transparent backdrop-blur-xl border-white/10'
          : !isMenuOpen && isScrolled
          ? 'bg-brand-sand border-brand-terracotta/20 shadow-lg'
          : !isMenuOpen
          ? 'backdrop-blur-md bg-white/[0.02] border-white/10'
          : '',
      ]"
    >
      <!-- Mobile Menu Button -->
      <button
        class="md:hidden relative z-50 p-2 text-white hover:text-brand-terracotta transition-colors"
        :class="{ 'text-brand-terracotta': isMenuOpen || isScrolled }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Left Links (Desktop) -->
      <div
        class="hidden md:flex flex-1 justify-end pr-6 md:pr-10 lg:pr-16 xl:pr-20"
      >
        <div
          class="flex gap-4 md:gap-6 lg:gap-10 xl:gap-12 justify-end pl-5 md:pl-0 lg:pl-5 xl:pl-10"
        >
          <NuxtLink
            v-for="link in links.slice(0, 2)"
            :key="link.path"
            :to="link.path"
            class="text-xs md:text-sm lg:text-base hover:text-brand-sand/70 transition-colors duration-700 ease-in-out whitespace-nowrap"
            :class="[
              isServicePage || isAboutPage || isQuizPage
                ? 'text-white'
                : isScrolled
                ? 'text-brand-terracotta'
                : 'text-white',
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- Center Logo -->
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <NuxtLink to="/" class="inline-flex items-center justify-center">
          <Logo
            ref="logo"
            class="h-6 sm:h-7 md:h-8 lg:h-9 fill-current transition-colors duration-300"
            :class="[
              isMenuOpen ? 'text-brand-terracotta' : '',
              !isMenuOpen && (isServicePage || isAboutPage || isQuizPage)
                ? 'text-white'
                : !isMenuOpen && isScrolled
                ? 'text-brand-terracotta'
                : 'text-white',
            ]"
          />
        </NuxtLink>
      </div>

      <!-- Right Links (Desktop) -->
      <div
        class="hidden md:flex flex-1 justify-start pl-6 md:pl-10 lg:pl-16 xl:pl-20"
      >
        <div
          class="flex gap-4 md:gap-6 lg:gap-10 xl:gap-12 justify-start pl-5 md:pl-0 lg:pl-5 xl:pl-10"
        >
          <NuxtLink
            v-for="link in links.slice(2)"
            :key="link.path"
            :to="link.path"
            class="text-xs md:text-sm lg:text-base hover:text-brand-sand/70 transition-colors duration-700 ease-in-out whitespace-nowrap"
            :class="[
              isServicePage || isAboutPage || isQuizPage
                ? 'text-white'
                : isScrolled
                ? 'text-brand-terracotta'
                : 'text-white',
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- Spacer for mobile right side balance -->
      <div class="md:hidden w-10"></div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="absolute inset-x-0 top-full h-screen bg-brand-sand flex flex-col items-center justify-start pt-24 space-y-8 md:hidden shadow-xl"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="text-2xl font-bold text-brand-terracotta hover:text-white transition-colors duration-300"
          @click="toggleMenu"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>
