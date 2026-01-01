// composables/useAppLoader.js
import { ref, readonly } from "vue";

// Estado global (singleton fuera del composable)
const isLoading = ref(true);
const isHeroReady = ref(false);
const videoPreloaded = ref(false);

export function useAppLoader() {
  /**
   * Llamado cuando el loader termina su animación
   */
  const completeLoader = () => {
    isLoading.value = false;
  };

  /**
   * Llamado desde HeroBlock cuando el video está listo
   */
  const setVideoPreloaded = () => {
    videoPreloaded.value = true;
  };

  /**
   * Señal para que HeroBlock inicie sus animaciones
   * Solo cuando: loader terminó Y video está listo (o timeout)
   */
  const setHeroReady = () => {
    isHeroReady.value = true;
  };

  /**
   * Reset para navegación (si es necesario)
   */
  const reset = () => {
    isLoading.value = true;
    isHeroReady.value = false;
    videoPreloaded.value = false;
  };

  return {
    // Estados (readonly para evitar mutaciones accidentales)
    isLoading: readonly(isLoading),
    isHeroReady: readonly(isHeroReady),
    videoPreloaded: readonly(videoPreloaded),

    // Métodos
    completeLoader,
    setVideoPreloaded,
    setHeroReady,
    reset,
  };
}
