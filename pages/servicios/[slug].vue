<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useHead } from "#app";
import { useRoute } from "#app";
import { useAvailability } from "~/composables/useAvailability";
import { SERVICE_BY_SLUG_QUERY } from "~/lib/servicesQuery";

const route = useRoute();
const { slug } = route.params;

const { data: service } = await useSanityQuery(SERVICE_BY_SLUG_QUERY, { slug });

const selectedImage = ref(0);
const selectedDuration = ref(null);
const selectedDate = ref("");
const selectedTime = ref("");

const fullName = ref("");
const email = ref("");
const telephone = ref("");

const isSubmitting = ref(false);

const errors = ref({
  fullName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  duration: "",
});

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10;
};

const isValidName = (name) => {
  const words = name.trim().split(/\s+/);
  return words.length >= 2 && words.every((word) => word.length >= 2);
};

const isValidDate = (date) => {
  if (!date) return false;
  const selected = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
};

const clearErrors = () => {
  errors.value = {
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration: "",
  };
};
const isFormComplete = computed(() => {
  return (
    selectedDuration.value &&
    selectedDate.value &&
    selectedTime.value &&
    fullName.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    telephone.value.trim().length > 0
  );
});

const validateForm = () => {
  clearErrors();
  let isValid = true;

  if (!selectedDuration.value) {
    errors.value.duration = "Selecciona una duración";
    isValid = false;
  }

  if (!selectedDate.value) {
    errors.value.date = "Selecciona una fecha";
    isValid = false;
  } else if (!isValidDate(selectedDate.value)) {
    errors.value.date = "La fecha no puede ser en el pasado";
    isValid = false;
  }

  if (!selectedTime.value) {
    errors.value.time = "Selecciona un horario";
    isValid = false;
  }

  if (!fullName.value.trim()) {
    errors.value.fullName = "El nombre es requerido";
    isValid = false;
  } else if (!isValidName(fullName.value)) {
    errors.value.fullName = "Ingresa nombre y apellido";
    isValid = false;
  }

  if (!email.value.trim()) {
    errors.value.email = "El email es requerido";
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    errors.value.email = "Ingresa un email válido";
    isValid = false;
  }

  // ✅ Usar telephone, no phone
  if (!telephone.value.trim()) {
    errors.value.phone = "El teléfono es requerido";
    isValid = false;
  } else if (!isValidPhone(telephone.value)) {
    errors.value.phone = "Ingresa 10 dígitos";
    isValid = false;
  }

  return isValid;
};

// ============================================
// AVAILABILITY
// ============================================

const { slots, loading, error, scheduleInfo, getAvailability, clear } =
  useAvailability();

watch([selectedDate, selectedDuration], ([newDate, newDuration]) => {
  if (newDate && newDuration) {
    selectedTime.value = "";
    getAvailability(service.value._id, newDate, newDuration);
  }
});

// ============================================
// COMPUTED
// ============================================

const allImages = computed(() => {
  const images = [];
  if (service.value.thumbnail) {
    images.push(service.value.thumbnail.asset.url);
  }
  if (service.value?.gallery?.length) {
    service.value.gallery.forEach((img) => {
      if (img.asset?.url) {
        images.push(img.asset.url);
      }
    });
  }
  return images;
});

const currentPrice = computed(() => {
  if (!service.value?.durations) return null;

  if (selectedDuration.value) {
    return service.value.durations.find(
      (duration) => duration.minutes === selectedDuration.value
    );
  }
  return (
    service.value.durations.find((d) => d.isDefault) ||
    service.value.durations[0]
  );
});

onMounted(() => {
  if (currentPrice.value) {
    selectedDuration.value = currentPrice.value.minutes;
  }
});

// ============================================
// RESERVE SESSION - CORREGIDO
// ============================================

const reserveSession = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  const bookingData = {
    serviceId: service.value._id,
    serviceName: service.value.name,
    duration: selectedDuration.value,
    serviceDescription: service.value.shortDescription,
    categoryName: service.value.category?.name,
    price: currentPrice.value.price,
    date: selectedDate.value,
    time: selectedTime.value,
    client: {
      name: fullName.value.trim(),
      email: email.value.trim().toLowerCase(),
      phone: telephone.value.replace(/\D/g, ""),
    },
  };

  try {
    const response = await $fetch("/api/create-checkout", {
      method: "POST",
      body: bookingData,
    });

    if (response.checkoutUrl) {
      window.location.href = response.checkoutUrl;
    }
  } catch (err) {
    console.error("Error:", err);
    alert(err.data?.message || "Error al procesar la reserva");
  } finally {
    isSubmitting.value = false;
  }
};

useHead({
  title: `${service.value.name} - Holistic Wellness`,
  meta: [{ name: "description", content: service.value.description }],
});
</script>

<template>
  <div class="relative min-h-screen overflow-hidden text-white">
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-brand-sand bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/95"
      ></div>
    </div>

    <div>
      <!-- Main Product Layout -->
      <div
        class="container mx-auto px-4 py-8 md:px-8 md:py-12 relative z-10 md:pt-20 pt-20"
      >
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <!-- Left: Image Gallery (40%) -->
          <div class="lg:col-span-2">
            <!-- Main Image -->
            <div class="mb-4 border border-stone-200">
              <NuxtImg
                :src="allImages[selectedImage]"
                :alt="service.name"
                class="w-full aspect-square object-cover"
              />
            </div>

            <!-- Thumbnails -->
            <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              <button
                v-for="(image, index) in allImages"
                :key="index"
                @click="selectedImage = index"
                :class="[
                  'flex-shrink-0 w-20 h-20 md:w-auto md:h-auto md:flex-1 border-2 transition-all',
                  selectedImage === index
                    ? 'border-stone-900'
                    : 'border-stone-200 hover:border-stone-400',
                ]"
              >
                <NuxtImg
                  :src="image"
                  :alt="`${service.name} view ${index + 1}`"
                  class="w-full aspect-square object-cover"
                />
              </button>
            </div>
          </div>

          <!-- Right: Service Details (60%) -->
          <div class="lg:col-span-3 relative z-10">
            <div
              class="bg-transparent border border-stone-200 p-6 md:p-8 lg:p-12"
            >
              <!-- Title & Price -->
              <div
                class="flex flex-col md:flex-row items-start justify-between mb-4"
              >
                <h1
                  class="font-headlines text-4xl md:text-5xl lg:text-7xl font-light leading-none mb-4 tracking-tight text-center md:text-left text-white uppercase"
                >
                  {{ service.name }}
                </h1>
                <span
                  class="text-3xl lg:text-4xl font-sans whitespace-nowrap ml-4 pt-3"
                >
                  ${{ currentPrice?.price }}
                </span>
              </div>

              <hr class="border-stone-200 mb-8" />

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <!-- Description -->
                <div>
                  <h2
                    class="text-xs tracking-[0.2em] uppercase font-medium mb-4 text-white/60"
                  >
                    Description
                  </h2>
                  <p class="text-white/90 text-base leading-relaxed">
                    {{ service.shortDescription }}
                  </p>
                </div>

                <!-- For -->
                <div>
                  <h2
                    class="text-xs tracking-[0.2em] uppercase font-medium mb-4 text-white/60"
                  >
                    For
                  </h2>
                  <ul class="space-y-2">
                    <li
                      v-for="(idealFor, index) in service.idealFor"
                      :key="index"
                      class="flex items-start gap-3"
                      @click="selectedDuration = index"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"
                      >
                      </span>
                      <span class="text-white/80 text-sm leading-relaxed">
                        {{ idealFor }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr class="border-stone-200 mb-8" />

              <!-- Duration Selector -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Duración
                </h3>
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="duration in service.durations"
                    :key="duration.minutes"
                    @click="
                      selectedDuration = duration.minutes;
                      errors.duration = '';
                    "
                    :class="[
                      'px-8 py-3 border-2 rounded-full transition-all text-sm tracking-wider font-medium',
                      selectedDuration === duration.minutes
                        ? 'bg-white text-stone-900 border-stone-900'
                        : 'bg-white text-stone-900 border-stone-300 hover:border-stone-900',
                    ]"
                  >
                    {{ duration.minutes }}
                  </button>
                </div>
                <p v-if="errors.duration" class="text-red-400 text-sm mt-2">
                  {{ errors.duration }}
                </p>
              </div>

              <!-- Date Picker -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Fecha
                </h3>
                <input
                  v-model="selectedDate"
                  @input="errors.date = ''"
                  type="date"
                  :min="new Date().toISOString().split('T')[0]"
                  :class="[
                    'w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black',
                    errors.date
                      ? 'border-red-400'
                      : 'border-stone-300 focus:border-stone-900',
                  ]"
                />
                <p v-if="errors.date" class="text-red-400 text-sm mt-2">
                  {{ errors.date }}
                </p>
              </div>

              <!-- Time Selector -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Hora
                </h3>

                <!-- Loading -->
                <div v-if="loading" class="py-4">
                  <div class="flex items-center gap-2 text-white/60">
                    <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="none"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Cargando horarios...</span>
                  </div>
                </div>

                <!-- Error -->
                <div
                  v-else-if="error"
                  class="py-4 px-4 bg-red-500/10 border border-red-500/30 rounded"
                >
                  <p class="text-red-400 text-sm">{{ error }}</p>
                </div>

                <!-- No hay fecha seleccionada -->
                <div v-else-if="!selectedDate" class="py-4">
                  <p class="text-white/50 text-sm">
                    Selecciona una fecha primero
                  </p>
                </div>

                <!-- Sin slots disponibles -->
                <div v-else-if="slots.length === 0" class="py-4">
                  <p class="text-white/50 text-sm">
                    No hay horarios disponibles para esta fecha
                  </p>
                </div>

                <!-- Grid de slots disponibles -->
                <div
                  v-else
                  class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2"
                >
                  <button
                    v-for="slot in slots"
                    :key="slot"
                    @click="
                      selectedTime = slot;
                      errors.time = '';
                    "
                    :class="[
                      'px-3 py-3 border-2 text-sm font-medium transition-all',
                      selectedTime === slot
                        ? 'bg-white text-stone-900 border-white'
                        : 'bg-transparent text-white border-stone-500 hover:border-white',
                    ]"
                  >
                    {{ slot }}
                  </button>
                </div>

                <!-- Info del horario -->
                <p
                  v-if="scheduleInfo && slots.length > 0"
                  class="mt-3 text-white/40 text-xs"
                >
                  Horario: {{ scheduleInfo.open }} - {{ scheduleInfo.close }}
                </p>

                <p v-if="errors.time" class="text-red-400 text-sm mt-2">
                  {{ errors.time }}
                </p>
              </div>

              <!-- Full Name -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Nombre completo
                </h3>
                <input
                  v-model="fullName"
                  @input="errors.fullName = ''"
                  type="text"
                  placeholder="Enter your full name"
                  :class="[
                    'w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black placeholder:text-stone-400',
                    errors.fullName
                      ? 'border-red-400'
                      : 'border-stone-300 focus:border-stone-900',
                  ]"
                />
                <p v-if="errors.fullName" class="text-red-400 text-sm mt-2">
                  {{ errors.fullName }}
                </p>
              </div>

              <!-- Email Address -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Correo electrónico
                </h3>
                <input
                  v-model="email"
                  @input="errors.email = ''"
                  type="email"
                  placeholder="Enter your email"
                  :class="[
                    'w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black placeholder:text-stone-400',
                    errors.email
                      ? 'border-red-400'
                      : 'border-stone-300 focus:border-stone-900',
                  ]"
                />
                <p v-if="errors.email" class="text-red-400 text-sm mt-2">
                  {{ errors.email }}
                </p>
              </div>

              <!-- Telephone -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Teléfono
                </h3>
                <input
                  v-model="telephone"
                  @input="errors.phone = ''"
                  type="tel"
                  placeholder="Enter your phone number"
                  maxlength="14"
                  :class="[
                    'w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black placeholder:text-stone-400',
                    errors.phone
                      ? 'border-red-400'
                      : 'border-stone-300 focus:border-stone-900',
                  ]"
                />
                <p v-if="errors.phone" class="text-red-400 text-sm mt-2">
                  {{ errors.phone }}
                </p>
              </div>

              <hr class="border-stone-200 mb-8" />

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="reserveSession"
                  :disabled="isSubmitting || !isFormComplete"
                  :class="[
                    'flex-1 py-4 px-8 tracking-widest uppercase text-sm font-bold transition-all duration-300 shadow-lg rounded-full',
                    isSubmitting || !isFormComplete
                      ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
                      : 'bg-brand-earth text-brand-terracotta hover:bg-brand-sand hover:shadow-brand-earth/30 hover:-translate-y-1',
                  ]"
                >
                  {{ isSubmitting ? "Procesando..." : "Reservar Sesión" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
