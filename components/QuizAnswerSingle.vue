<script setup>
const props = defineProps({
  answers: Array,
  selected: Object,
});
console.log("🟢 QuizAnswerSingle.vue props.answers:", props.answers);
console.log("🟢 QuizAnswerSingle.vue props.selected:", props.selected);

const emit = defineEmits(["select"]);

const isSelected = (answer) => {
  return props.selected?.answerValue === answer.answerValue;
};
</script>

<template>
  <div class="answers-single">
    <button
      v-for="answer in answers"
      :key="answer.answerValue"
      @click="emit('select', answer)"
      class="answer-option"
      :class="{ 'answer-selected': isSelected(answer) }"
    >
      <span class="answer-radio">
        <span v-if="isSelected(answer)" class="radio-dot"></span>
      </span>
      <span class="answer-text">{{ answer.answerText }}</span>
    </button>
  </div>
</template>

<style scoped>
.answers-single {
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

.answer-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.answer-selected .answer-radio {
  border-color: #3b82f6;
}

.radio-dot {
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
}

.answer-text {
  font-size: 1rem;
  line-height: 1.5;
}
</style>
