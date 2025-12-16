<script setup>
import { ref } from "vue";
import Logo from "~/assets/icons/logo-copy.svg";
import { gsap } from "gsap";

const logo = ref(null);

onMounted(() => {
  gsap.to(logo.value, {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 6,
    repeat: -1,
    ease: "none",
  });
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full">
      <div
        class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
      >
        <!-- Spinner animado -->
        <div class="flex justify-center mb-8">
          <div class="relative w-32 h-32">
            <!-- Círculo exterior giratorio -->
            <div
              class="absolute inset-0 border-8 border-white/30 rounded-full"
            ></div>
            <div
              class="absolute inset-0 border-8 border-transparent border-t-white rounded-full animate-spin"
            ></div>

            <!-- Círculo interior -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div ref="logo">
                <Logo class="h-10 w-10 logo-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Texto principal -->
        <h2
          class="text-3xl font-headlines text-white text-center mb-4 font-light"
        >
          Calculando resultados...
        </h2>

        <!-- Texto secundario con animación -->
        <p class="text-white/80 text-center text-lg mb-8">
          <span class="inline-block animate-pulse font-sans"
            >Analizando tus respuestas</span
          >
          <span class="inline-block animate-bounce ml-1">.</span>
          <span
            class="inline-block animate-bounce ml-1"
            style="animation-delay: 0.2s"
            >.</span
          >
          <span
            class="inline-block animate-bounce ml-1"
            style="animation-delay: 0.4s"
            >.</span
          >
        </p>

        <!-- Barra de progreso -->
        <div class="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div class="bg-white h-full rounded-full animate-progress"></div>
        </div>

        <!-- Mensaje adicional -->
        <p class="text-white/60 text-center text-sm mt-6 font-sans">
          Esto solo tomará un momento
        </p>
      </div>

      <!-- Partículas decorativas flotantes -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-float-delayed"
        ></div>
        <div
          class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-float"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0.6;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 3s ease-in-out infinite;
  animation-delay: 1s;
}
</style>
