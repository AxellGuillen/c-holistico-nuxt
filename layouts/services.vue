<script setup>
/**
 * Layout: Services
 * ================
 * Layout fullscreen para la página de servicios.
 * - Sin navbar visible (la página maneja su propia navegación)
 * - Ocupa exactamente 100vh sin scroll
 * - El scroll es interno al contenido
 */
</script>

<template>
  <div class="services-layout">
    <slot />
  </div>
</template>

<style scoped>
.services-layout {
  height: 100vh;
  height: 100dvh; /* Dynamic viewport para móviles */
  width: 100%;
  overflow: hidden;
  position: fixed;
  inset: 0;
}
</style>
