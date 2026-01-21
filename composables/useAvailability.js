// composables/useAvailability.js
import { ref } from "vue";

export const useAvailability = () => {
  const slots = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const scheduleInfo = ref(null);

  const getAvailability = async (serviceId, date, duration) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/availability", {
        params: { serviceId, date, duration },
      });

      if (response?.available) {
        slots.value = response.slots;
        scheduleInfo.value = {
          day: response.day,
          open: response.schedule.open,
          close: response.schedule.close,
        };
      } else {
        slots.value = [];
        error.value = response?.message || "No availability";
      }
    } catch (e) {
      error.value = "Error fetching availability";
      slots.value = [];
    } finally {
      loading.value = false;
    }
  };

  const clear = () => {
    slots.value = [];
    error.value = null;
    scheduleInfo.value = null;
  };

  return {
    slots,
    loading,
    error,
    scheduleInfo,
    getAvailability,
    clear,
  };
};
