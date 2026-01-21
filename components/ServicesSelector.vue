<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
  preselectedSlug: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["continue", "image-change"]);

// Estado interno
const selectedService = ref(null);
const activeCategory = ref(null);
const scrollContainer = ref(null);

// Refs para los headers de categorías
const categoryRefs = ref({});

// Servicios agrupados por categoría
const servicesByCategory = computed(() => {
  const grouped = {};

  props.categories.forEach((cat) => {
    const slug = cat.slug?.current || cat.slug;
    grouped[slug] = {
      category: cat,
      services: props.services.filter((service) => {
        const serviceSlug =
          service.category?.slug?.current || service.category?.slug;
        return serviceSlug === slug;
      }),
    };
  });

  return grouped;
});

// Categorías con servicios (filtrar vacías)
const categoriesWithServices = computed(() => {
  return props.categories.filter((cat) => {
    const slug = cat.slug?.current || cat.slug;
    return servicesByCategory.value[slug]?.services.length > 0;
  });
});

// Precio formateado del servicio seleccionado
const formattedPrice = computed(() => {
  if (!selectedService.value) return null;
  const price = selectedService.value.durations?.[0]?.price;
  if (!price) return null;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(price);
});

// Duración del servicio seleccionado
const selectedDuration = computed(() => {
  if (!selectedService.value) return null;
  return selectedService.value.durations?.[0]?.minutes;
});

// Seleccionar servicio
const selectService = (service) => {
  selectedService.value = service;
  const imageUrl =
    service.image?.asset?.url ||
    service.image?.url ||
    service.thumbnail?.asset?.url ||
    service.thumbnail?.url ||
    service.mainImage?.asset?.url ||
    service.mainImage?.url ||
    null;

  if (imageUrl) {
    emit("image-change", imageUrl);
  }
};

// Verificar si un servicio está seleccionado
const isSelected = (service) => {
  return selectedService.value?._id === service._id;
};

// Scroll suave a una categoría
const scrollToCategory = (slug) => {
  const element = document.getElementById(`categoria-${slug}`);
  if (element && scrollContainer.value) {
    const containerTop = scrollContainer.value.getBoundingClientRect().top;
    const elementTop = element.getBoundingClientRect().top;
    const offset = elementTop - containerTop - 80;

    scrollContainer.value.scrollBy({
      top: offset,
      behavior: "smooth",
    });
  }
};

// Continuar al siguiente paso
const handleContinue = () => {
  if (selectedService.value) {
    emit("continue", selectedService.value);
  }
};

// IntersectionObserver para detectar categoría activa
let observer = null;

// Handler de scroll para detectar cuando estamos en el top
const handleScroll = () => {
  if (!scrollContainer.value) return;

  // Si estamos cerca del top (< 100px), activar la primera categoría
  if (scrollContainer.value.scrollTop < 100) {
    if (categoriesWithServices.value.length > 0) {
      const firstSlug =
        categoriesWithServices.value[0].slug?.current ||
        categoriesWithServices.value[0].slug;
      activeCategory.value = firstSlug;
    }
  }
};

const setupObserver = () => {
  if (!scrollContainer.value) return;

  const options = {
    root: scrollContainer.value,
    rootMargin: "-80px 0px -70% 0px",
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    // Ignorar si estamos en el top (handleScroll se encarga)
    if (scrollContainer.value && scrollContainer.value.scrollTop < 100) {
      return;
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const slug = entry.target.dataset.categorySlug;
        if (slug) {
          activeCategory.value = slug;
        }
      }
    });
  }, options);

  Object.values(categoryRefs.value).forEach((el) => {
    if (el) observer.observe(el);
  });

  // Agregar listener de scroll
  scrollContainer.value.addEventListener("scroll", handleScroll, {
    passive: true,
  });
};

const setCategoryRef = (el, slug) => {
  if (el) {
    categoryRefs.value[slug] = el;
  }
};

onMounted(async () => {
  await nextTick();

  if (categoriesWithServices.value.length > 0) {
    const firstSlug =
      categoriesWithServices.value[0].slug?.current ||
      categoriesWithServices.value[0].slug;
    activeCategory.value = firstSlug;
  }

  setupObserver();

  if (props.preselectedSlug) {
    const service = props.services.find(
      (s) => s.slug?.current === props.preselectedSlug,
    );
    if (service) {
      selectedService.value = service;
      // Opcional: hacer scroll a ese servicio
      nextTick(() => {
        const element = document.getElementById(`service-${service._id}`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }
});

onUnmounted(() => {
  // Limpiar scroll listener
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", handleScroll);
  }

  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- Pills de categorías (sticky) -->
    <div
      class="sticky top-0 z-10 bg-brand-base border-b border-brand-sand/50 px-4 py-3"
    >
      <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          v-for="category in categoriesWithServices"
          :key="category._id"
          @click="scrollToCategory(category.slug?.current || category.slug)"
          class="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
          :class="[
            activeCategory === (category.slug?.current || category.slug)
              ? 'bg-brand-terracotta text-white'
              : 'bg-brand-soft text-brand-terracotta/70 hover:bg-brand-sand hover:text-brand-terracotta',
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Lista de servicios (scrollable) -->
    <div
      ref="scrollContainer"
      data-lenis-prevent
      class="flex-1 overflow-y-auto px-4 py-6 bg-brand-base"
    >
      <div
        v-for="category in categoriesWithServices"
        :key="category._id"
        class="mb-8 last:mb-0"
      >
        <!-- Header de categoría -->
        <div
          :id="`categoria-${category.slug?.current || category.slug}`"
          :ref="
            (el) => setCategoryRef(el, category.slug?.current || category.slug)
          "
          :data-category-slug="category.slug?.current || category.slug"
          class="flex items-center gap-3 mb-4"
        >
          <span
            class="text-xs font-semibold uppercase tracking-widest text-brand-terracotta/60"
          >
            {{ category.name }}
          </span>
          <span class="flex-1 h-px bg-brand-sand"></span>
        </div>

        <!-- Cards de servicios -->
        <div class="flex flex-col gap-3">
          <button
            v-for="service in servicesByCategory[
              category.slug?.current || category.slug
            ]?.services"
            :key="service._id"
            @click="selectService(service)"
            class="w-full text-left p-4 rounded-2xl border-2 transition-all duration-200"
            :class="[
              isSelected(service)
                ? 'border-brand-terracotta bg-white'
                : 'border-brand-sand/50 bg-white hover:border-brand-clay hover:bg-brand-soft/30',
            ]"
          >
            <div class="flex items-start justify-between gap-3">
              <!-- Contenido del servicio -->
              <div class="flex-1 min-w-0">
                <h3
                  class="font-headlines text-lg font-medium text-brand-terracotta leading-tight mb-1"
                >
                  {{ service.name }}
                </h3>
                <p
                  v-if="service.shortDescription"
                  class="text-sm text-brand-terracotta/60 line-clamp-2 mb-2"
                >
                  {{ service.shortDescription }}
                </p>
                <div
                  class="flex items-center gap-2 text-sm text-brand-terracotta/50"
                >
                  <span v-if="service.durations?.[0]?.minutes">
                    {{ service.durations[0].minutes }} mins
                  </span>
                  <span
                    v-if="
                      service.durations?.[0]?.minutes &&
                      service.durations?.[0]?.price
                    "
                    class="text-brand-clay"
                  >
                    •
                  </span>
                  <span
                    v-if="service.durations?.[0]?.price"
                    class="font-medium text-brand-terracotta"
                  >
                    {{
                      new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                        minimumFractionDigits: 0,
                      }).format(service.durations[0].price)
                    }}
                  </span>
                </div>
              </div>

              <!-- Indicador de selección -->
              <div
                class="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                :class="[
                  isSelected(service)
                    ? 'border-brand-terracotta bg-brand-terracotta'
                    : 'border-brand-sand bg-transparent',
                ]"
              >
                <!-- Check icon -->
                <svg
                  v-if="isSelected(service)"
                  class="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <!-- Plus icon -->
                <svg
                  v-else
                  class="w-3.5 h-3.5 text-brand-clay"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Mensaje cuando no hay servicios -->
      <div
        v-if="categoriesWithServices.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <p class="text-brand-terracotta/60">
          No hay servicios disponibles en este momento.
        </p>
      </div>
    </div>

    <!-- Footer fijo -->
    <div
      class="sticky bottom-0 bg-white border-t border-brand-sand/50 px-4 py-4"
    >
      <div class="flex items-center justify-between gap-4">
        <!-- Info del servicio seleccionado -->
        <div class="flex-1 min-w-0">
          <div v-if="selectedService" class="flex items-baseline gap-2">
            <span
              class="text-lg font-headlines font-medium text-brand-terracotta"
            >
              {{ formattedPrice }}
            </span>
            <span class="text-sm text-brand-terracotta/50">
              • {{ selectedDuration }} mins
            </span>
          </div>
          <p v-else class="text-sm text-brand-terracotta/50">
            Selecciona un servicio
          </p>
        </div>

        <!-- Botón continuar -->
        <button
          @click="handleContinue"
          :disabled="!selectedService"
          class="flex-shrink-0 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200"
          :class="[
            selectedService
              ? 'bg-brand-terracotta text-white hover:bg-brand-terracotta/90 active:scale-[0.98]'
              : 'bg-brand-sand text-brand-terracotta/40 cursor-not-allowed',
          ]"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
