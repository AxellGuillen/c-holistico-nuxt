import { ref, computed, watch } from "vue";

/**
 * useBooking
 *
 * Composable para manejar todo el flujo de reserva.
 * Usado por ScheduleAppointment.vue
 *
 * FLUJO:
 * 1. setService() → carga el servicio y duración default
 * 2. Usuario selecciona duración (si hay múltiples)
 * 3. Usuario selecciona fecha
 * 4. useAvailability carga slots (externo, se conecta via watch)
 * 5. Usuario selecciona hora
 * 6. Usuario llena datos personales
 * 7. reserveSession() → MercadoPago
 */

export function useBooking() {
  // =========================
  // STATE - Servicio
  // =========================
  const selectedService = ref(null);

  // =========================
  // STATE - Booking
  // =========================
  const selectedDuration = ref(null);
  const selectedDate = ref("");
  const selectedTime = ref("");

  // =========================
  // STATE - Cliente
  // =========================
  const fullName = ref("");
  const email = ref("");
  const telephone = ref("");

  // =========================
  // STATE - UI
  // =========================
  const isSubmitting = ref(false);
  const bookingStep = ref(1); // 1: fecha/hora, 2: datos, 3: confirmación

  const errors = ref({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration: "",
  });

  // =========================
  // COMPUTED
  // =========================

  /**
   * Precio actual basado en la duración seleccionada
   */
  const currentPrice = computed(() => {
    if (!selectedService.value?.durations) return null;

    if (selectedDuration.value) {
      return selectedService.value.durations.find(
        (d) => d.minutes === selectedDuration.value,
      );
    }

    // Default: el marcado como default o el primero
    return (
      selectedService.value.durations.find((d) => d.isDefault) ||
      selectedService.value.durations[0]
    );
  });

  /**
   * Verifica si el formulario está completo para habilitar submit
   */
  const isFormComplete = computed(() => {
    return (
      selectedService.value &&
      selectedDuration.value &&
      selectedDate.value &&
      selectedTime.value &&
      fullName.value.trim() &&
      email.value.trim() &&
      telephone.value.trim()
    );
  });

  /**
   * Verifica si la selección de fecha/hora está completa
   */
  const isScheduleComplete = computed(() => {
    return selectedDuration.value && selectedDate.value && selectedTime.value;
  });

  /**
   * Datos del servicio formateados para mostrar
   */
  const serviceInfo = computed(() => {
    if (!selectedService.value) return null;

    return {
      id: selectedService.value._id,
      name: selectedService.value.name,
      description: selectedService.value.shortDescription,
      category: selectedService.value.category?.name,
      durations: selectedService.value.durations || [],
      hasMutipleDurations: (selectedService.value.durations?.length || 0) > 1,
    };
  });

  // =========================
  // VALIDATORS
  // =========================
  const isValidEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const isValidPhone = (value) => value.replace(/\D/g, "").length === 10;

  const isValidName = (value) => {
    const words = value.trim().split(/\s+/);
    return words.length >= 2 && words.every((w) => w.length >= 2);
  };

  const isValidDate = (value) => {
    if (!value) return false;
    const selected = new Date(value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  };

  // =========================
  // METHODS
  // =========================

  /**
   * Limpia todos los errores
   */
  const clearErrors = () => {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = "";
    });
  };

  /**
   * Setea el servicio y configura la duración default
   */
  const setService = (service) => {
    selectedService.value = service;

    // Setear duración default
    if (service?.durations?.length) {
      const defaultDuration = service.durations.find((d) => d.isDefault);
      selectedDuration.value =
        defaultDuration?.minutes || service.durations[0]?.minutes;
    }

    // Reset resto del estado
    selectedDate.value = "";
    selectedTime.value = "";
    clearErrors();
    bookingStep.value = 1;
  };

  /**
   * Reset completo del estado (al cerrar o completar)
   */
  const resetBooking = () => {
    selectedService.value = null;
    selectedDuration.value = null;
    selectedDate.value = "";
    selectedTime.value = "";
    fullName.value = "";
    email.value = "";
    telephone.value = "";
    isSubmitting.value = false;
    bookingStep.value = 1;
    clearErrors();
  };

  /**
   * Avanza al siguiente paso
   */
  const nextStep = () => {
    if (bookingStep.value < 3) {
      bookingStep.value++;
    }
  };

  /**
   * Retrocede al paso anterior
   */
  const prevStep = () => {
    if (bookingStep.value > 1) {
      bookingStep.value--;
    }
  };

  /**
   * Valida el formulario completo
   */
  const validateForm = () => {
    clearErrors();
    let valid = true;

    if (!selectedDuration.value) {
      errors.value.duration = "Selecciona una duración";
      valid = false;
    }

    if (!selectedDate.value) {
      errors.value.date = "Selecciona una fecha";
      valid = false;
    } else if (!isValidDate(selectedDate.value)) {
      errors.value.date = "La fecha no puede ser en el pasado";
      valid = false;
    }

    if (!selectedTime.value) {
      errors.value.time = "Selecciona un horario";
      valid = false;
    }

    if (!fullName.value.trim()) {
      errors.value.fullName = "El nombre es requerido";
      valid = false;
    } else if (!isValidName(fullName.value)) {
      errors.value.fullName = "Ingresa nombre y apellido";
      valid = false;
    }

    if (!email.value.trim()) {
      errors.value.email = "El email es requerido";
      valid = false;
    } else if (!isValidEmail(email.value)) {
      errors.value.email = "Ingresa un email válido";
      valid = false;
    }

    if (!telephone.value.trim()) {
      errors.value.phone = "El teléfono es requerido";
      valid = false;
    } else if (!isValidPhone(telephone.value)) {
      errors.value.phone = "Ingresa 10 dígitos";
      valid = false;
    }

    return valid;
  };

  /**
   * Valida solo el paso de schedule (fecha/hora)
   */
  const validateSchedule = () => {
    clearErrors();
    let valid = true;

    if (!selectedDuration.value) {
      errors.value.duration = "Selecciona una duración";
      valid = false;
    }

    if (!selectedDate.value) {
      errors.value.date = "Selecciona una fecha";
      valid = false;
    } else if (!isValidDate(selectedDate.value)) {
      errors.value.date = "La fecha no puede ser en el pasado";
      valid = false;
    }

    if (!selectedTime.value) {
      errors.value.time = "Selecciona un horario";
      valid = false;
    }

    return valid;
  };

  /**
   * Valida solo los datos del cliente
   */
  const validateClientData = () => {
    // Solo limpia errores de cliente
    errors.value.fullName = "";
    errors.value.email = "";
    errors.value.phone = "";

    let valid = true;

    if (!fullName.value.trim()) {
      errors.value.fullName = "El nombre es requerido";
      valid = false;
    } else if (!isValidName(fullName.value)) {
      errors.value.fullName = "Ingresa nombre y apellido";
      valid = false;
    }

    if (!email.value.trim()) {
      errors.value.email = "El email es requerido";
      valid = false;
    } else if (!isValidEmail(email.value)) {
      errors.value.email = "Ingresa un email válido";
      valid = false;
    }

    if (!telephone.value.trim()) {
      errors.value.phone = "El teléfono es requerido";
      valid = false;
    } else if (!isValidPhone(telephone.value)) {
      errors.value.phone = "Ingresa 10 dígitos";
      valid = false;
    }

    return valid;
  };

  /**
   * Ejecuta la reserva y redirige a MercadoPago
   */
  const reserveSession = async () => {
    if (!validateForm()) return false;
    if (!selectedService.value || !currentPrice.value) return false;

    isSubmitting.value = true;

    const payload = {
      serviceId: selectedService.value._id,
      serviceName: selectedService.value.name,
      serviceDescription: selectedService.value.shortDescription,
      categoryName: selectedService.value.category?.name,
      duration: selectedDuration.value,
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
      const res = await $fetch("/api/create-checkout", {
        method: "POST",
        body: payload,
      });

      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      isSubmitting.value = false;
    }
  };

  // =========================
  // PUBLIC API
  // =========================
  return {
    // State - Servicio
    selectedService,
    serviceInfo,

    // State - Booking
    selectedDuration,
    selectedDate,
    selectedTime,
    currentPrice,

    // State - Cliente
    fullName,
    email,
    telephone,

    // State - UI
    errors,
    isSubmitting,
    bookingStep,

    // Computed
    isFormComplete,
    isScheduleComplete,

    // Methods - Setup
    setService,
    resetBooking,

    // Methods - Navigation
    nextStep,
    prevStep,

    // Methods - Validation
    validateForm,
    validateSchedule,
    validateClientData,
    clearErrors,

    // Methods - Action
    reserveSession,
  };
}
