<script setup>
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const props = defineProps({
  list: { type: Array, required: true },
});

const emit = defineEmits(["select"]);
</script>

<template>
  <div class="space-y-2">
    <div v-for="names in list" :key="names.slug">
      <button @click="emit('select', names.slug)">
        <span
          ref="el"
          class="inline-block select-none cursor-pointer text-[13px] uppercase"
        >
          {{ names.title }}
        </span>
      </button>
    </div>
  </div>
</template>
