<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  isFirst: Boolean,
  isLast: Boolean,
});

const emit = defineEmits(["answer", "back"]);

// Estado local: respuesta seleccionada
const selectedAnswer = ref(null);
const selectedMultiple = ref([]);

// ===== MÉTODOS =====
const handleSingleSelect = (answer) => {
  selectedAnswer.value = answer;
};

const handleMultipleSelect = (answer) => {
  const index = selectedMultiple.value.findIndex(
    (a) => a.answerValue === answer.answerValue
  );

  if (index > -1) {
    // Ya está seleccionado, remover
    selectedMultiple.value.splice(index, 1);
  } else {
    // No está, agregar
    selectedMultiple.value.push(answer);
  }
};

const handleSubmit = () => {
  const answer =
    props.question.questionType === "multiple"
      ? selectedMultiple.value
      : selectedAnswer.value;

  if (!answer || (Array.isArray(answer) && answer.length === 0)) {
    alert("Por favor selecciona al menos una opción");
    return;
  }

  emit("answer", answer);

  // Reset para siguiente pregunta
  selectedAnswer.value = null;
  selectedMultiple.value = [];
};

const canSubmit = computed(() => {
  if (props.question.questionType === "multiple") {
    const min = props.question.minSelections || 1;
    return selectedMultiple.value.length >= min;
  }
  return selectedAnswer.value !== null;
});
</script>

<template>
  <div class="quiz-question">
    <!-- Texto de la pregunta -->
    <div class="question-header">
      <h2 class="question-text">{{ question.questionText }}</h2>
      <p v-if="question.subtitle" class="question-subtitle">
        {{ question.subtitle }}
      </p>
    </div>

    <!-- Opciones de respuesta -->
    <div class="answers-container">
      <!-- Pregunta de selección única -->
      <QuizAnswerSingle
        v-if="question.questionType === 'single'"
        :answers="question.answers"
        :selected="selectedAnswer"
        @select="handleSingleSelect"
      />

      <!-- Pregunta de selección múltiple -->
      <QuizAnswerMultiple
        v-else-if="question.questionType === 'multiple'"
        :answers="question.answers"
        :selected="selectedMultiple"
        @select="handleMultipleSelect"
      />
    </div>

    <!-- Navegación -->
    <div class="question-navigation">
      <button v-if="!isFirst" @click="emit('back')" class="btn-back">
        ← Atrás
      </button>

      <button
        @click="handleSubmit"
        :disabled="!canSubmit"
        class="btn-next"
        :class="{ 'btn-submit': isLast }"
      >
        {{ isLast ? "Ver Resultado" : "Siguiente" }} →
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz-question {
  padding: 2rem;
}

.question-header {
  margin-bottom: 2rem;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.question-subtitle {
  color: #666;
  font-size: 0.95rem;
}

.answers-container {
  margin-bottom: 2rem;
}

.question-navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-back,
.btn-next {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}

.btn-next {
  background: #3b82f6;
  color: white;
  border: none;
}

.btn-next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  background: #10b981;
}
</style>
