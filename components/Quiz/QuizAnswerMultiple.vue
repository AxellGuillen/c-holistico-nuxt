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
      class="flex items-center gap-4 p-5 border rounded-full text-left cursor-pointer transition-all min-h-[5rem] md:h-auto group"
      :class="[
        isSelected(answer)
          ? 'bg-brand-sand border-brand-sand'
          : 'bg-transparent border-white/40 hover:border-white hover:bg-white/5',
      ]"
    >
      <!-- Caja del checkbox -->
      <span
        class="w-6 h-6 shrink-0 border rounded-full flex items-center justify-center transition-all"
        :class="[
          isSelected(answer)
            ? 'bg-brand-terracotta border-brand-terracotta'
            : 'bg-transparent border-white/60 group-hover:border-white',
        ]"
      >
        <svg
          v-if="isSelected(answer)"
          class="w-3.5 h-3.5 text-white"
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
      <span
        class="font-sans leading-relaxed text-[15px] md:text-base font-medium"
        :class="[isSelected(answer) ? 'text-brand-terracotta' : 'text-white']"
      >
        {{ answer.answerText }}
      </span>
    </button>

    <p class="text-center text-sm text-white/60 mt-2 font-sans">
      {{ selected.length }} seleccionada(s)
    </p>
  </div>
</template>
