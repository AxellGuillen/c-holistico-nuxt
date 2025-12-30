<script setup></script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-brand-base relative overflow-hidden"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-brand-base to-brand-soft z-0"
    ></div>

    <div class="relative z-10 text-center px-6 max-w-lg w-full">
      <!-- Pending Icon -->
      <div
        class="w-24 h-24 mx-auto mb-8 rounded-full bg-yellow-100 flex items-center justify-center animate-fade-in-up"
      >
        <svg
          class="w-12 h-12 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>

      <!-- Content -->
      <h1
        class="text-4xl md:text-5xl font-headlines text-brand-terracotta mb-6 animate-fade-in-up delay-100"
      >
        Pago pendiente
      </h1>
      <p
        class="font-body text-lg text-brand-terracotta/80 mb-10 leading-relaxed animate-fade-in-up delay-200"
      >
        Tu pago está siendo procesado.<br class="hidden sm:block" />
        Te notificaremos cuando se confirme tu reserva.
      </p>

      <!-- Button -->
      <NuxtLink
        to="/"
        class="inline-block bg-brand-terracotta text-brand-base px-10 py-4 rounded-full font-sans font-medium hover:bg-brand-terracotta/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 animate-fade-in-up delay-300"
      >
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
