<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Logo from "~/assets/icons/logo.svg?component";
import { gsap } from "gsap";

const { links } = useNavigation();

const nav = ref(null);
const logo = ref(null);

let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 50) {
    // Scroll hacia abajo → ocultar navbar
    gsap.to(nav.value, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  } else {
    gsap.to(nav.value, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }
  lastScroll = currentScroll;
}

onMounted(() => {
  // Animación inicial al cargar
  const logoEl = document.querySelector("#logo-root");
  gsap.from(logoEl, {
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
});
</script>

<template>
  <header ref="nav" class="fixed inset-x-0 top-0 z-50 font-sans font-bold">
    <nav
      class="relative flex items-center px-4 sm:px-6 md:px-8 lg:px-15 xl:px-16 py-3 sm:py-3 text-xs sm:text-sm text-white tracking-wide w-full backdrop-blur-md bg-white/[0.02] border-b border-white/10"
    >
      <div class="flex justify-end w-[600px]">
        <div
          class="hidden md:flex gap-6 lg:pl-10 justify-between w-[200px] lg:w-[300px] md:pr-10"
        >
          <NuxtLink
            v-for="link in links.slice(0, 2)"
            :key="link.path"
            :to="link.path"
            class="text-xs hover:text-brand-blush transition-colors duration-700 ease-in-out whitespace-nowrap lg:text-base"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- Center Logo -->
      <div class="absolute left-1/2 -translate-x-1/2 z-10">
        <NuxtLink to="" class="inline-flex items-center justify-center">
          <Logo
            ref="logo"
            class="h-6 sm:h-7 lg:h-8 fill-current ml-auto md:ml-1"
          />
        </NuxtLink>
      </div>

      <div
        class="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center flex-1 justify-end"
      >
        <div class="w-[600px] pl-10">
          <div
            class="hidden md:flex gap-6 lg:gap-10 xl:gap-14 justify-start w-[200px lg:w-[300px]"
          >
            <NuxtLink
              v-for="link in links.slice(2)"
              :key="link.path"
              :to="link.path"
              class="text-xs hover:text-brand-blush transition-colors duration-700 ease-in-out whitespace-nowrap lg:font-sans lg:font-bold lg:text-base"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- CTA  -->
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  will-change: transform, opacity;
}

/* Button Fill Hover Effect */
.btn-fill-hover {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.btn-fill-hover::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(135deg, #f6ccc4 0%, #f0b5a3 100%);
  z-index: 0;
  transition: height 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 9999px;
}

.btn-fill-hover:hover {
  border-color: #f6ccc4;
  box-shadow: 0 8px 24px rgba(246, 204, 196, 0.2);
}

.btn-fill-hover:hover::before {
  height: 100%;
}

.btn-fill-hover span {
  position: relative;
  z-index: 10;
  transition: color 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-fill-hover:hover span {
  color: #050000;
}

/* Border bottom elegante */
@supports (backdrop-filter: blur(1px)) {
  nav {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  nav {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 640px) {
  nav {
    padding: 0.5rem 1rem;
  }
}
</style>
