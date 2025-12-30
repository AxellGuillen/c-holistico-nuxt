<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import Logo from "~/assets/icons/logoMobile.svg?component";
import gsap from "gsap";

const isOpen = ref(false);
const line1 = ref(null);
const line2 = ref(null);
const line3 = ref(null);
const logo = ref(null);

const { links } = useNavigation();

// Hamburger Animation (GSAP for precise vector control)
const animateHamburger = (toOpen) => {
  if (toOpen) {
    gsap
      .timeline()
      .to(
        line1.value,
        { rotation: 53, y: 6, duration: 0.3, transformOrigin: "center" },
        0
      )
      .to(line2.value, { opacity: 0, duration: 0.2 }, 0)
      .to(
        line3.value,
        { rotation: -50, y: -16, duration: 0.3, transformOrigin: "center" },
        0
      );
  } else {
    gsap
      .timeline()
      .to(line1.value, { rotation: 0, y: 0, duration: 0.3 }, 0)
      .to(line2.value, { opacity: 1, duration: 0.2 }, 0.1)
      .to(line3.value, { rotation: 0, y: 0, duration: 0.3 }, 0);
  }
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

// Sync Hamburger with isOpen state
watch(isOpen, (newVal) => {
  animateHamburger(newVal);
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(() => {
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isOpen.value) {
      closeMenu();
    }
  });

  if (logo.value && logo.value.$el) {
    gsap.to(logo.value.$el, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm md:hidden bg-brand-sand/20"
  >
    <div class="px-6 py-3 flex items-center justify-between">
      <div class="z-50 items-center">
        <Logo ref="logo" class="w-8 h-8" />
      </div>

      <button
        @click="toggleMenu"
        class="p-2 transition focus:outline-none z-[60] pt-5"
        :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <div class="w-8 h-6 relative flex flex-col justify-between">
          <span
            ref="line1"
            class="w-8 h-0.5 bg-white transition-colors duration-300"
            :class="isOpen ? 'bg-brand-terracotta' : 'bg-white'"
          />
          <span
            ref="line2"
            class="w-8 h-0.5 bg-white transition-all"
            :class="isOpen ? 'bg-brand-terracotta' : 'bg-white'"
          />
          <span
            ref="line3"
            class="w-8 h-0.5 bg-white transition-colors duration-300"
            :class="isOpen ? 'bg-brand-terracotta' : 'bg-white'"
          />
        </div>
      </button>
    </div>

    <!-- Full Screen Menu Overlay -->
    <Transition
      enter-active-class="duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-400 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-brand-sand h-[100dvh] w-full flex flex-col pt-24 pb-8 overflow-y-auto overflow-x-hidden"
      >
        <!-- Background Decor -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        ></div>

        <div class="-my-4 px-6 flex flex-col flex-grow h-full justify-between">
          <!-- Navigation Links -->
          <ul class="flex-grow flex flex-col justify-center gap-6 py-8">
            <li
              v-for="(link, index) in links"
              :key="link.path"
              class="transform transition-all duration-500 will-change-transform opacity-0 animate-slide-in"
              :style="{
                animationDelay: `${index * 100 + 150}ms`,
                animationFillMode: 'forwards',
              }"
            >
              <NuxtLink
                :to="link.path"
                class="group flex items-baseline justify-end gap-4"
                @click="closeMenu"
              >
                <span
                  class="text-sm font-sans font-light text-white/40 group-hover:text-brand-terracotta transition-colors duration-300"
                >
                  {{ String(index + 1).padStart(2, "0") }}
                </span>
                <span
                  class="text-4xl md:text-5xl font-headlines font-light text-white tracking-wide group-hover:text-brand-terracotta transition-colors duration-300 group-hover:translate-x-2 transform"
                >
                  {{ link.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>

          <!-- Divider -->
          <div
            class="h-px w-full bg-white/10 mb-8 opacity-0 animate-fade-in"
            style="animation-delay: 500ms; animation-fill-mode: forwards"
          ></div>

          <!-- Footer Info -->
          <div
            class="flex flex-col gap-6 text-right opacity-0 animate-slide-up"
            style="animation-delay: 600ms; animation-fill-mode: forwards"
          >
            <div class="group">
              <p
                class="text-xs uppercase tracking-widest text-brand-terracotta mb-1 font-bold"
              >
                Contacto
              </p>
              <a
                href="mailto:info@raices.com"
                class="text-lg font-headlines text-white/80 hover:text-white transition-colors"
              >
                info@raices.com
              </a>
            </div>

            <div class="group">
              <p
                class="text-xs uppercase tracking-widest text-brand-terracotta mb-1 font-bold"
              >
                Llámanos
              </p>
              <a
                href="tel:+525551234567"
                class="text-lg font-headlines text-white/80 hover:text-white transition-colors"
              >
                +52 (555) 123-4567
              </a>
            </div>

            <div class="pt-4">
              <p class="text-[10px] text-white/30 font-sans tracking-wide">
                © {{ new Date().getFullYear() }} Raíces Centro Holístico
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-in {
  animation-name: slideIn;
  animation-timing-function: cubic-bezier(
    0.16,
    1,
    0.3,
    1
  ); /* Ease Out Expoish */
}

.animate-slide-up {
  animation-name: slideUp;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-duration: 0.6s;
}

.animate-fade-in {
  animation-name: fadeIn;
  animation-duration: 0.8s;
}

/* Ensure Logo color transitions smoothly */
.nav-logo {
  transition: color 0.3s ease;
}
</style>
