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
  <div class="answers-multiple">
    <button
      v-for="answer in answers"
      :key="answer.answerValue"
      @click="emit('select', answer)"
      class="answer-option"
      :class="{ 'answer-selected': isSelected(answer) }"
    >
      <span class="answer-checkbox">
        <svg
          v-if="isSelected(answer)"
          class="checkbox-icon"
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

      <span class="answer-text">{{ answer.answerText }}</span>
    </button>

    <p class="selection-hint">{{ selected.length }} seleccionada(s)</p>
  </div>
</template>

<style scoped>
.answers-multiple {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.answer-option:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
}

.answer-selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.answer-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  background: white;
}

.answer-selected .answer-checkbox {
  border-color: #3b82f6;
  background: #3b82f6;
}

.checkbox-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.answer-text {
  font-size: 1rem;
  line-height: 1.5;
}

.selection-hint {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}
</style>
