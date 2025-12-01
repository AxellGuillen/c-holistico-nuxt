<script setup>
const props = defineProps({
  answers: Array,
  selected: Array,
});

const emit = defineEmits(["select"]);

const isSelected = (answer) => {
  return props.selected.some((a) => a.answerValue === answer.answerValue);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <button
      v-for="answer in answers"
      :key="answer.answerValue"
      @click="emit('select', answer)"
      class="flex items-center gap-4 p-5 border-2 border-brand-terracotta rounded-full text-left cursor-pointer transition-all h-20 md:h-auto"
      :class="{
        'border-brand-terracotta bg-brand-sand': isSelected(answer),
        'border-brand-terracotta hover:shadow-md hover:shadow-blue-500/10': true,
      }"
    >
      <!-- Caja del checkbox -->
      <span
        class="w-6 h-6 shrink-0 border-2 rounded-full flex items-center justify-center transition-all bg-white"
        :class="{
          'border-brand-terracotta ': isSelected(answer),
        }"
      >
        <svg
          v-if="isSelected(answer)"
          class="w-4 h-4 text-brand-terracotta"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </span>

      <!-- Texto -->
      <span class="font-sans leading-relaxed">
        {{ answer.answerText }}
      </span>
    </button>

    <p class="text-center text-sm text-gray-500 mt-2">
      {{ selected.length }} seleccionada(s)
    </p>
  </div>
</template>
