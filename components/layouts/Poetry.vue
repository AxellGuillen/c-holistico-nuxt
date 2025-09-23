<script setup>
import { PortableText } from "@portabletext/vue";

const props = defineProps({
  data: { type: Object, required: true },
  title: { type: String, default: "" },
});
</script>

<template>
  <section class="prose prose-invert max-w-3xl mx-auto py-10">
    <div class="flex items-center justify-center">
      <section class="p-6">[Gallery] {{ title }}</section>
    </div>
    <PortableText v-if="data?.content" :value="data.content" />
    <p v-else class="opacity-60">No hay contenido.</p>
  </section>
</template>
