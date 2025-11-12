<script setup>
defineProps(["block", "urlFor", "urlForPlaceholder"]);
import { ref, nextTick } from "vue";
const { $gsap } = useNuxtApp();

const modalEl = ref(null);
const selectedImage = ref(null);
const isModalOpen = ref(false);

async function openModal(image) {
  selectedImage.value = image;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";

  await nextTick();

  const modal = modalEl.value;
  if (!modal) return;

  $gsap.fromTo(
    modal,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", delay: 0.05 }
  );
}

function closeModal() {
  const modal = modalEl.value;

  $gsap.to(modal, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      isModalOpen.value = false;
      selectedImage.value = null;
    },
  });

  isModalOpen.value = false;
  selectedImage.value = null;
  document.body.style.overflow = "auto";
  document.body.style.overflow = "hidden";
}
</script>

<template>
  <section class="relative overflow-hidden bg-transparent py-12">
    <div class="w-full">
      <!-- el track que se mueve: debe tener width = max-content -->
      <div
        class="marquee-track flex gap-4"
        :class="['animate-marquee']"
        role="menu"
      >
        <!-- original -->
        <div
          v-for="image in block.images"
          :key="image._key"
          class="flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80"
          @click="openModal(image)"
        >
          <NuxtImg
            :src="image.url"
            :alt="image.alt"
            :placeholder="image.lqip"
            class="h-[400px] w-auto object-cover"
            loading="lazy"
          />
        </div>

        <!-- duplicado para loop infinito -->
        <div
          v-for="image in block.images"
          :key="`duplicate-${image._key}`"
          class="flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80"
          @click="openModal(image)"
        >
          <NuxtImg
            :src="image.url"
            :alt="image.alt"
            :placeholder="image.lqip"
            class="h-[400px] w-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isModalOpen"
          ref="modalEl"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-brand-sand/80 backdrop-blur-sm overflow-hidden"
          @click.self="closeModal"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-brand-terracotta/50 text-2xl hover:text-brand-terracotta/100 transition-colors ease-in"
          >
            ✕
          </button>
          <div class="relative flex flex-col items-center justify-center p-4">
            <NuxtImg
              v-if="selectedImage"
              :src="selectedImage.url"
              :alt="selectedImage.alt"
              class="max-w-[90vw] max-h-[90vh] rounded-2xl object-contain"
            />

            <p
              v-if="selectedImage?.caption"
              class="mt-2 text-center text-brand-terracotta text-[20px] opacity-80 font-headlines uppercase"
            >
              {{ selectedImage.caption }}
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* ancho del track: importante para que el translateX tenga efecto */
.marquee-track {
  display: flex;
  width: max-content; /* que el elemento mida lo que ocupan todas las imágenes */
  align-items: center;
  will-change: transform;
}

/* keyframes */
@keyframes marquee {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(
      0
    ); /* mover la mitad del ancho (original + duplicado) */
  }
}

/* Duración (ajusta 20s/30s según número de imágenes / ritmo visual) */
.animate-marquee {
  animation: marquee 30s linear infinite;
}

/* pausa al hover (útil en desktop) */
.marquee-track:hover {
  animation-play-state: paused;
}

/* pequeñas transiciones que ya tenías para modal/opacity */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
