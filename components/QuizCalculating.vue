<script setup>
// Este componente es puramente visual y no requiere lógica
// La transición automática a QuizResult se maneja en el componente padre
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4"
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
              class="absolute inset-0 border-8 border-white/20 rounded-full"
            ></div>
            <div
              class="absolute inset-0 border-8 border-transparent border-t-white rounded-full animate-spin"
            ></div>

            <!-- Círculo interior -->
            <div
              class="absolute inset-4 bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Texto principal -->
        <h2 class="text-3xl font-bold text-white text-center mb-4">
          Calculando resultados...
        </h2>

        <!-- Texto secundario con animación -->
        <p class="text-white/90 text-center text-lg mb-8">
          <span class="inline-block animate-pulse"
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
        <p class="text-white/70 text-center text-sm mt-6">
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
