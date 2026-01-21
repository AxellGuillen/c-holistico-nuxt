<script setup>
/**
 * ScheduleAppointment.vue
 *
 * Panel de agendamiento de cita.
 * Se muestra después de seleccionar un servicio en ServicesSelector.
 *
 * FLUJO:
 * 1. Usuario ve duración pre-seleccionada (puede cambiar si hay múltiples)
 * 2. Usuario selecciona fecha del calendario
 * 3. Se cargan slots disponibles (useAvailability)
 * 4. Usuario selecciona hora
 * 5. Usuario llena datos personales
 * 6. Click "Reservar" → MercadoPago
 *
 * USA:
 * - useBooking() → estado, validaciones, submit
 * - useAvailability() → carga slots de hora
 */

import { watch, onMounted, computed } from "vue";
import { useBooking } from "~/composables/useBooking";
import { useAvailability } from "~/composables/useAvailability";

// ============================================
// PROPS & EMITS
// ============================================

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["back", "success"]);

// ============================================
// COMPOSABLES
// ============================================

const {
  // State - Booking
  selectedDuration,
  selectedDate,
  selectedTime,

  // State - Cliente
  fullName,
  email,
  telephone,

  // State - UI
  errors,
  isSubmitting,

  // Computed
  currentPrice,
  isFormComplete,

  // Methods
  setService,
  validateForm,
  reserveSession,
  clearErrors,
} = useBooking();

const {
  slots,
  loading: slotsLoading,
  error: slotsError,
  scheduleInfo,
  getAvailability,
  clear: clearSlots,
} = useAvailability();

// ============================================
// LIFECYCLE
// ============================================

onMounted(() => {
  if (props.service) {
    setService(props.service);
  }
});

// Si cambia el servicio, reiniciar
watch(
  () => props.service,
  (newService) => {
    if (newService) {
      setService(newService);
      clearSlots();
    }
  },
);

// Cargar slots cuando cambia fecha o duración
watch([selectedDate, selectedDuration], ([newDate, newDuration]) => {
  if (newDate && newDuration && props.service?._id) {
    selectedTime.value = "";
    getAvailability(props.service._id, newDate, newDuration);
  }
});

// ============================================
// COMPUTED
// ============================================

/**
 * ¿El servicio tiene múltiples duraciones?
 */
const hasMultipleDurations = computed(() => {
  return (props.service?.durations?.length || 0) > 1;
});

/**
 * Genera los próximos 14 días para el calendario horizontal
 */
const calendarDates = computed(() => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push({
      value: date.toISOString().split("T")[0], // 2026-01-21
      dayName: date
        .toLocaleDateString("es-MX", { weekday: "short" })
        .toUpperCase()
        .replace(".", ""), // LUN, MAR, etc.
      dayNumber: date.getDate(),
      isToday: i === 0,
    });
  }

  return dates;
});

/**
 * Mes y año actual para mostrar arriba del calendario
 */
const currentMonthYear = computed(() => {
  const date = selectedDate.value
    ? new Date(selectedDate.value + "T00:00:00")
    : new Date();

  return date
    .toLocaleDateString("es-MX", {
      month: "long",
      year: "numeric",
    })
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalizar
});

// ============================================
// METHODS
// ============================================

const handleBack = () => {
  emit("back");
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const success = await reserveSession();
    if (success) {
      emit("success");
    }
  } catch (err) {
    // El error se maneja en el composable
  }
};

const selectDate = (dateValue) => {
  selectedDate.value = dateValue;
  errors.value.date = "";
};

const selectTime = (time) => {
  selectedTime.value = time;
  errors.value.time = "";
};

const selectDuration = (minutes) => {
  selectedDuration.value = minutes;
  selectedTime.value = ""; // Reset hora al cambiar duración
  errors.value.duration = "";
};
</script>

<template>
  <div class="flex flex-col h-full bg-surface">
    <!-- ========================================
         HEADER
         ======================================== -->
    <header
      class="flex-shrink-0 flex items-center justify-between p-4 md:p-6 border-b border-surface-emphasis"
    >
      <!-- Botón Volver -->
      <button
        @click="handleBack"
        class="flex items-center gap-2 text-content-muted hover:text-content transition-colors"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="text-sm font-medium hidden sm:inline">Volver</span>
      </button>

      <!-- Nombre del servicio -->
      <h2
        class="text-sm font-medium text-content tracking-wide text-center flex-1 px-4 truncate"
      >
        {{ service?.name }}
      </h2>

      <!-- Botón Cerrar -->
      <button
        @click="handleBack"
        class="p-2 text-content-muted hover:text-content transition-colors rounded-full hover:bg-surface-muted"
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
    </header>

    <!-- ========================================
         CONTENIDO SCROLLEABLE
         ======================================== -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-4 md:p-6 space-y-6">
        <!-- ==================
             DURACIÓN
             ================== -->
        <section v-if="hasMultipleDurations">
          <h3
            class="text-xs font-semibold text-content tracking-widest uppercase mb-3"
          >
            Duración
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="duration in service.durations"
              :key="duration.minutes"
              @click="selectDuration(duration.minutes)"
              :class="[
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all border-2',
                selectedDuration === duration.minutes
                  ? 'bg-content text-surface border-content'
                  : 'bg-transparent text-content border-surface-emphasis hover:border-content',
              ]"
            >
              {{ duration.minutes }} min
            </button>
          </div>
          <p v-if="errors.duration" class="text-red-500 text-sm mt-2">
            {{ errors.duration }}
          </p>
        </section>

        <!-- ==================
             FECHA
             ================== -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h3
              class="text-xs font-semibold text-content tracking-widest uppercase"
            >
              Selecciona fecha
            </h3>
            <span class="text-sm text-content-muted">
              {{ currentMonthYear }}
            </span>
          </div>

          <!-- Calendario horizontal -->
          <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              v-for="day in calendarDates"
              :key="day.value"
              @click="selectDate(day.value)"
              :class="[
                'flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl transition-all',
                selectedDate === day.value
                  ? 'bg-content text-surface'
                  : 'bg-surface-muted text-content hover:bg-surface-emphasis',
              ]"
            >
              <span class="text-[10px] font-medium tracking-wider">
                {{ day.dayName }}
              </span>
              <span class="text-lg font-semibold">
                {{ day.dayNumber }}
              </span>
            </button>
          </div>

          <p v-if="errors.date" class="text-red-500 text-sm mt-2">
            {{ errors.date }}
          </p>
        </section>

        <!-- ==================
             HORA
             ================== -->
        <section>
          <h3
            class="text-xs font-semibold text-content tracking-widest uppercase mb-3"
          >
            Selecciona hora
          </h3>

          <!-- Estado: Cargando -->
          <div
            v-if="slotsLoading"
            class="py-8 flex items-center justify-center"
          >
            <div class="flex items-center gap-3 text-content-muted">
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
              <span class="text-sm">Cargando horarios...</span>
            </div>
          </div>

          <!-- Estado: Error -->
          <div
            v-else-if="slotsError"
            class="py-6 px-4 bg-red-50 border border-red-200 rounded-xl text-center"
          >
            <p class="text-red-600 text-sm">{{ slotsError }}</p>
          </div>

          <!-- Estado: Sin fecha seleccionada -->
          <div v-else-if="!selectedDate" class="py-8 text-center">
            <p class="text-content-muted text-sm">
              Selecciona una fecha para ver horarios disponibles
            </p>
          </div>

          <!-- Estado: Sin slots -->
          <div
            v-else-if="slots.length === 0"
            class="py-6 px-4 bg-surface-muted rounded-xl text-center"
          >
            <p class="text-content font-medium mb-1">Sin disponibilidad</p>
            <p class="text-content-muted text-sm">
              No hay horarios disponibles para esta fecha. Por favor elige otra.
            </p>
          </div>

          <!-- Estado: Slots disponibles -->
          <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <button
              v-for="slot in slots"
              :key="slot"
              @click="selectTime(slot)"
              :class="[
                'py-3 px-2 rounded-lg text-sm font-medium transition-all border-2',
                selectedTime === slot
                  ? 'bg-content text-surface border-content'
                  : 'bg-surface text-content border-surface-emphasis hover:border-content',
              ]"
            >
              {{ slot }}
            </button>
          </div>

          <!-- Info de horario -->
          <p
            v-if="scheduleInfo && slots.length > 0"
            class="mt-3 text-content-muted text-xs"
          >
            Horario: {{ scheduleInfo.open }} - {{ scheduleInfo.close }}
          </p>

          <p v-if="errors.time" class="text-red-500 text-sm mt-2">
            {{ errors.time }}
          </p>
        </section>

        <!-- DIVIDER -->
        <hr class="border-surface-emphasis" />

        <!-- ==================
             DATOS PERSONALES
             ================== -->
        <section class="space-y-4">
          <h3
            class="text-xs font-semibold text-content tracking-widest uppercase"
          >
            Tus datos
          </h3>

          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-content mb-1.5">
              Nombre completo
            </label>
            <input
              v-model="fullName"
              @input="errors.fullName = ''"
              type="text"
              placeholder="Ej: María García López"
              :class="[
                'w-full px-4 py-3 rounded-xl border-2 bg-surface text-content placeholder:text-content-muted/50 focus:outline-none transition-colors',
                errors.fullName
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-surface-emphasis focus:border-content',
              ]"
            />
            <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">
              {{ errors.fullName }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-content mb-1.5">
              Correo electrónico
            </label>
            <input
              v-model="email"
              @input="errors.email = ''"
              type="email"
              placeholder="tu@correo.com"
              :class="[
                'w-full px-4 py-3 rounded-xl border-2 bg-surface text-content placeholder:text-content-muted/50 focus:outline-none transition-colors',
                errors.email
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-surface-emphasis focus:border-content',
              ]"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-content mb-1.5">
              Teléfono
            </label>
            <input
              v-model="telephone"
              @input="errors.phone = ''"
              type="tel"
              placeholder="10 dígitos"
              maxlength="14"
              :class="[
                'w-full px-4 py-3 rounded-xl border-2 bg-surface text-content placeholder:text-content-muted/50 focus:outline-none transition-colors',
                errors.phone
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-surface-emphasis focus:border-content',
              ]"
            />
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
              {{ errors.phone }}
            </p>
          </div>
        </section>
      </div>
    </main>

    <!-- ========================================
         FOOTER FIJO
         ======================================== -->
    <footer
      class="flex-shrink-0 p-4 md:p-6 border-t border-surface-emphasis bg-surface"
    >
      <div class="flex items-center justify-between gap-4">
        <!-- Precio -->
        <div>
          <p class="text-2xl font-semibold text-content">
            ${{ currentPrice?.price?.toLocaleString() || 0 }}
            <span class="text-sm font-normal text-content-muted">MXN</span>
          </p>
          <p class="text-xs text-content-muted">
            {{ selectedDuration || "--" }} min
          </p>
        </div>

        <!-- Botón Reservar -->
        <button
          @click="handleSubmit"
          :disabled="!isFormComplete || isSubmitting"
          :class="[
            'px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all',
            isFormComplete && !isSubmitting
              ? 'bg-content text-surface hover:opacity-90 active:scale-[0.98]'
              : 'bg-surface-emphasis text-content-muted cursor-not-allowed',
          ]"
        >
          <span v-if="isSubmitting" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
            Procesando...
          </span>
          <span v-else>Reservar</span>
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
