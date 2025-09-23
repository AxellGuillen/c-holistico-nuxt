<script setup>
defineProps({ data: Object, title: String });
</script>

<template>
  <div class="flex items-center justify-center">
    <section class="p-6">[Gallery] {{ title }}</section>
  </div>
</template>
