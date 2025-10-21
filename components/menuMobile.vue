<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "~/assets/icons/logo.svg?component";
import gsap from "gsap";

const isOpen = ref(false);
const menuPanel = ref(null);
const overlay = ref(null);
const line1 = ref(null);
const line2 = ref(null);
const line3 = ref(null);
const menuItems = ref([]);
const logo = ref(null);

const { links } = useNavigation();

// Animación del hamburger icon
const animateHamburger = (toOpen) => {
  if (toOpen) {
    gsap
      .timeline()
      .to(line1.value, { rotation: 51, y: 8, duration: 0.3 }, 0)
      .to(line2.value, { opacity: 0, duration: 0.2 }, 0)
      .to(line3.value, { rotation: -51, y: -8, duration: 0.3 }, 0);
  } else {
    gsap
      .timeline()
      .to(line1.value, { rotation: 0, y: 0, duration: 0.3 }, 0)
      .to(line2.value, { opacity: 1, duration: 0.2 }, 0.1)
      .to(line3.value, { rotation: 0, y: 0, duration: 0.3 }, 0);
  }
};

// Animación del menú y overlay
const animateMenuOpen = () => {
  // ⬇️ CRITICAL: Establecer estados iniciales antes de animar
  gsap.set(overlay.value, { opacity: 0 });
  gsap.set(menuPanel.value, { y: -20, opacity: 0 });
  gsap.set(menuItems.value, { opacity: 0, x: -20 });

  gsap
    .timeline()
    // Overlay fade in
    .to(overlay.value, { opacity: 1, duration: 0.3 }, 0)
    // Menu panel slide in desde arriba
    .to(
      menuPanel.value,
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      0.1
    )
    // Items del menú stagger
    .to(
      menuItems.value,
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      },
      0.2
    );
};

const animateMenuClose = () => {
  gsap
    .timeline()
    // Items salen
    .to(
      menuItems.value,
      {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      },
      0
    )
    // Menu panel slide out
    .to(
      menuPanel.value,
      { y: -20, opacity: 0, duration: 0.3, ease: "power3.in" },
      0.1
    )
    // Overlay fade out
    .to(overlay.value, { opacity: 0, duration: 0.2 }, 0.1);
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  animateHamburger(isOpen.value);

  if (isOpen.value) {
    // ⬇️ Esperar al siguiente frame para que el DOM esté listo
    requestAnimationFrame(() => {
      animateMenuOpen();
    });
    document.body.style.overflow = "hidden";
  } else {
    animateMenuClose();
    document.body.style.overflow = "auto";
  }
};

const closeMenu = () => {
  isOpen.value = false;
  animateHamburger(false);
  animateMenuClose();
  document.body.style.overflow = "auto";
};

// Cerrar al redimensionar
onMounted(() => {
  // Listener de resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isOpen.value) {
      closeMenu();
    }
  });

  // Animación del logo (rotación infinita)
  if (logo.value && logo.value.$el) {
    // Para componentes SVG importados con ?component
    gsap.to(logo.value.$el, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 6,
      repeat: -1,
      ease: "none",
    });
  }
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm md:hidden">
    <div class="px-4 py-4 flex items-center justify-between">
      <div class="z-50 items-center">
        <Logo ref="logo" class="w-6 h-6 text-brand-terracotta" />
      </div>

      <button
        @click="toggleMenu"
        class="p-2 transition z-50"
        :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <div class="w-6 h-6 relative">
          <!-- Hamburger Icon -->
          <span
            ref="line1"
            class="absolute w-6 h-0.5 bg-white top-1 transition-all"
          />
          <span
            ref="line2"
            class="absolute w-6 h-0.5 bg-white top-3 transition-all"
          />
          <span
            ref="line3"
            class="absolute w-6 h-0.5 bg-white top-5 transition-all"
          />
        </div>
      </button>
    </div>

    <!-- Overlay (fondo oscuro) -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="overlay"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        style="opacity: 0"
        @click="closeMenu"
      />
    </Teleport>

    <!-- Panel del Menú -->
    <Transition name="slide-menu">
      <div
        v-if="isOpen"
        ref="menuPanel"
        class="fixed top-0 left-0 right-0 w-full h-screen bg-brand-sand md:hidden z-40"
        style="opacity: 0; transform: translateY(-20px)"
      >
        <!-- Contenido del menú con scroll -->
        <div class="px-6 py-20 max-h-screen overflow-y-auto">
          <!-- Links del menú -->
          <ul class="space-y-6">
            <li
              v-for="(link, index) in links"
              :key="index"
              ref="menuItems"
              class="text-3xl font-light text-terracota-sand font-headlines"
              style="opacity: 0; transform: translateX(-20px)"
            >
              <NuxtLink
                :to="link.path"
                class="flex items-center gap-3 transition-colors duration-300 group justify-end"
                @click="closeMenu"
              >
                <span class="text-sm text-white transition-colors">
                  {{ String(index + 1).padStart(2, "0") }}
                </span>
                <span class="group-hover:translate-x-1 transition-transform">
                  {{ link.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>

          <!-- Separador -->
          <div class="border-t border-zinc-800 my-8" />

          <!-- Info Footer -->
          <div class="space-y-4 text-sm text-zinc-400 text-right">
            <div>
              <p class="text-zinc-500 mb-1">Email</p>
              <a href="mailto:info@raices.com" class="text-white transition">
                info@raices.com
              </a>
            </div>
            <div>
              <p class="text-zinc-500 mb-1">Teléfono</p>
              <a href="tel:+5215551234567" class="text-white transition">
                +52 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Transición del panel (fallback CSS si GSAP no funciona) */
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: all 0.3s ease;
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
