<script setup>
import { ref, computed } from "vue";
import { CATEGORIES_QUERY, SERVICES_QUERY } from "~/lib/servicesQuery";

const { data: services } = await useSanityQuery(SERVICES_QUERY);
const { data: categories } = await useSanityQuery(CATEGORIES_QUERY);

const route = useRoute();
const router = useRouter();

// ========== ESTADO ==========
const currentView = ref("services"); // 'services' | 'schedule'
const selectedService = ref(null);
const showExitModal = ref(false); // Modal de confirmación

// ========== COMPUTED ==========
const categoriesList = computed(() => categories.value || []);
const servicesList = computed(() => services.value || []);

// Texto dinámico para panel izquierdo
const leftPanelContent = computed(() => {
  if (currentView.value === "services") {
    return {
      title: "Descubre nuestros servicios",
      subtitle: "de bienestar holístico",
    };
  }
  return {
    title: "Agenda tu cita",
    subtitle: selectedService.value?.name || "para tu bienestar",
  };
});

const preselectedServiceSlug = computed(() => route.query.service || null);

// Imagen dinámica del panel izquierdo
const leftPanelImage = ref(null);

// Imagen por defecto o la del servicio seleccionado
const currentImage = computed(() => {
  return leftPanelImage.value || "/images/services-hero.jpg";
});

// ========== HANDLERS ==========
const handleServiceSelected = (service) => {
  selectedService.value = service;
  currentView.value = "schedule";
};

// Handler para cuando cambia la imagen al hacer hover/click en un servicio
const handleImageChange = (imageUrl) => {
  leftPanelImage.value = imageUrl;
};

const handleBack = () => {
  currentView.value = "services";
};

const handleSuccess = () => {
  console.log("✅ Reserva exitosa");
};

// ========== EXIT MODAL ==========
const handleExit = () => {
  showExitModal.value = true;
};

const confirmExit = () => {
  showExitModal.value = false;
  router.push("/");
};

const cancelExit = () => {
  showExitModal.value = false;
};

// ========== SEO ==========
useHead({
  title: "Nuestros Servicios - Raíces Centro Holístico",
  meta: [
    {
      name: "description",
      content: "Descubre nuestros servicios de bienestar holístico.",
    },
  ],
});

definePageMeta({
  layout: "services",
});
</script>

<template>
  <!-- h-screen + overflow-hidden para contener todo en el viewport -->
  <div class="h-screen w-full overflow-hidden bg-brand-base">
    <div class="grid grid-cols-1 lg:grid-cols-2 h-full">
      <!-- ========== PANEL IZQUIERDO (Desktop) ========== -->
      <div class="relative hidden lg:block h-full overflow-hidden">
        <!-- Imagen dinámica con transición -->
        <Transition name="fade" mode="out-in">
          <NuxtImg
            :key="currentImage"
            :src="currentImage"
            alt="Raíces Centro Holístico"
            format="webp"
            quality="80"
            placeholder
            class="absolute inset-0 w-full h-full object-cover"
          />
        </Transition>

        <!-- Overlay gradiente -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
        />

        <!-- Texto superpuesto -->
        <div class="absolute bottom-12 left-12 right-12">
          <p
            class="text-white/80 text-4xl xl:text-5xl font-sans font-light leading-tight"
          >
            {{ leftPanelContent.title }}
          </p>
          <p
            class="text-white text-4xl xl:text-5xl font-headlines italic leading-tight"
          >
            {{ leftPanelContent.subtitle }}
          </p>
        </div>
      </div>

      <!-- ========== PANEL DERECHO ========== -->
      <div
        class="relative flex flex-col h-full bg-brand-base overflow-hidden"
        data-lenis-prevent
      >
        <!-- Botón de escape (X) -->
        <button
          @click="handleExit"
          class="absolute top-3 right-4 z-50 p-2 rounded-full bg-brand-sand/50 hover:bg-brand-sand text-brand-terracotta transition-all"
          aria-label="Salir"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ServicesSelector
          v-if="currentView === 'services'"
          :categories="categoriesList"
          :services="servicesList"
          :preselected-slug="preselectedServiceSlug"
          @continue="handleServiceSelected"
          @image-change="handleImageChange"
        />

        <ScheduleAppointment
          v-else-if="currentView === 'schedule'"
          :service="selectedService"
          @back="handleBack"
          @success="handleSuccess"
        />
      </div>
    </div>

    <!-- ========== MODAL DE CONFIRMACIÓN ========== -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showExitModal"
          class="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="cancelExit"
          />

          <!-- Modal -->
          <div
            class="relative bg-brand-base rounded-2xl shadow-2xl p-6 mx-4 max-w-sm w-full"
          >
            <!-- Icono -->
            <div class="flex justify-center mb-4">
              <div
                class="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-brand-terracotta"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <!-- Texto -->
            <h3
              class="text-lg font-headlines text-brand-terracotta text-center mb-2"
            >
              ¿Estás seguro que deseas salir?
            </h3>
            <p class="text-sm text-brand-terracotta/60 text-center mb-6">
              Tu progreso no será guardado.
            </p>

            <!-- Botones -->
            <div class="flex gap-3">
              <button
                @click="cancelExit"
                class="flex-1 px-4 py-3 rounded-full border-2 border-brand-sand text-brand-terracotta font-medium text-sm hover:bg-brand-sand transition-colors"
              >
                Cancelar
              </button>
              <button
                @click="confirmExit"
                class="flex-1 px-4 py-3 rounded-full bg-brand-terracotta text-brand-base font-medium text-sm hover:bg-brand-terracotta/90 transition-colors"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Transición suave para cambio de imagen */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transición del modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
