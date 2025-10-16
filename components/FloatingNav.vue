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
    gsap.to(nav.value, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
  }
  lastScroll = currentScroll;
}

onMounted(() => {
  // Animación inicial al cargar
  gsap.from(nav.value, {
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power1.out",
    overwrite: "auto",
  });

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
  <header
    ref="nav"
    class="fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b border-white bg-white/10"
  >
    <nav
      class="relative flex items-center px-6 sm:px-10 py-[15px] text-sm text-white tracking-wide w-full"
    >
      <!-- 🧭 Links izquierda -->
      <div class="flex gap-8 md:gap-14 justify-end items-end w-[600px]">
        <NuxtLink
          v-for="link in links.slice(0, 2)"
          :key="link.path"
          :to="link.path"
          class="hover:text-brand-sand transition-colors duration-300"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="absolute left-1/2 -translate-x-1/2 z-10">
        <NuxtLink to="/" class="font-serif text-base md:text-lg tracking-wider">
          <Logo ref="logo" class="h-8 fill-current text-brand-primary" />
        </NuxtLink>
      </div>

      <div
        class="flex gap-6 md:gap-10 ml-auto w-[300px] items-start justify-between pl-14"
      >
        <NuxtLink
          v-for="link in links.slice(2)"
          :key="link.path"
          :to="link.path"
          class="hover:text-brand-sand transition-colors duration-300"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="ml-auto">
        <NuxtLink
          to="/contact"
          class="btn-fill-hover border-2 relative overflow-hidden inline-flex justify-end items-center h-8 md:h-10 px-5 md:px-6 rounded-full text-white font-medium tracking-wide transition duration-300"
        >
          <span> Agenda tu encuentro </span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  will-change: transform, opacity;
}
.btn-fill-hover {
  background-color: transparent; /* fondo inicial */
  color: white; /* texto inicial */
}

.btn-fill-hover::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0%;
  background-color: #f6ccc4; /* color que “llena” el botón */
  z-index: 0;
  transition: height 0.4s ease;
}

.btn-fill-hover:hover::before {
  height: 100%; /* llena todo el botón desde abajo hacia arriba */
}

.btn-fill-hover span {
  position: relative;
  z-index: 10; /* que el texto esté arriba del pseudo-elemento */
  transition: color 0.4s ease;
}

.btn-fill-hover:hover span {
  color: #a54f36; /* o color oscuro según contraste */
}
</style>
