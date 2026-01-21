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

const selectedAnswer = ref(null);
const selectedMultiple = ref([]);

const handleSingleSelect = (answer) => {
  selectedAnswer.value = answer;
};

const handleMultipleSelect = (answer) => {
  const index = selectedMultiple.value.findIndex(
    (a) => a.answerValue === answer.answerValue
  );

  if (index > -1) {
    selectedMultiple.value.splice(index, 1);
  } else {
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
  <div class="px-5 py-8 md:p-8 relative z-10 bg-transparent">
    <!-- Header -->
    <div class="mb-8 pt-20">
      <h2
        class="font-headlines text-5xl md:text-7xl font-light leading-none mb-4 tracking-tight md:text-center text-center text-white pt-10"
      >
        {{ question.questionText }}
      </h2>

      <p
        v-if="question.subtitle"
        class="text-white text-sm leading-relaxed font-sans text-center flex justify-center"
      >
        {{ question.subtitle }}
      </p>
    </div>

    <!-- Respuestas -->
    <div class="mb-8">
      <QuizAnswerSingle
        v-if="question.questionType === 'single'"
        :answers="question.answers"
        :selected="selectedAnswer"
        @select="handleSingleSelect"
      />

      <QuizAnswerMultiple
        v-else-if="question.questionType === 'multiple'"
        :answers="question.answers"
        :selected="selectedMultiple"
        @select="handleMultipleSelect"
      />
    </div>

    <!-- Navegación -->
    <div
      class="flex items-center gap-4"
      :class="isFirst ? 'justify-end' : 'justify-between'"
    >
      <button
        v-if="!isFirst"
        @click="emit('back')"
        class="px-4 py-2 border-brand-terracotta/40 text-white hover:bg-brand-terracotta/10 transition rounded-full text-[15px] font-sans"
      >
        ← Atrás
      </button>
      <div class="w-[200px] flex justify-end pr-2">
        <button
          @click="handleSubmit"
          :disabled="!canSubmit"
          :class="[
            'border border-brand-terracotta/40 py-2 rounded-full text-[15px] tracking-wider font-sans flex items-start justify-center gap-3 w-[170px] transition relative',
            isLast && canSubmit
              ? 'bg-brand-sand text-brand-terracotta hover:bg-brand-sand animate-pulse-glow'
              : isLast
              ? 'bg-brand-sand text-brand-terracotta'
              : 'bg-brand-sand text-brand-terracotta hover:bg-brand-sand/80',
            !canSubmit && 'opacity-50 cursor-not-allowed',
          ]"
        >
          {{ isLast ? "Ver Resultado" : "Siguiente" }} →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Glow suave en Terracotta --- */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 25px rgba(194, 123, 110, 0.45),
      /* terracotta */ 0 0 50px rgba(194, 123, 110, 0.25),
      0 0 75px rgba(194, 123, 110, 0.18);
  }
  50% {
    box-shadow: 0 0 35px rgba(194, 123, 110, 0.7),
      0 0 70px rgba(194, 123, 110, 0.45), 0 0 105px rgba(194, 123, 110, 0.25);
  }
}

/* --- Destello lateral (shimmer) --- */
@keyframes shimmer {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}

/* --- Aura giratoria Terracotta (más premium) --- */
@keyframes rotating-aura {
  0% {
    transform: rotate(0deg);
    opacity: 0.55;
  }
  50% {
    opacity: 0.85;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.55;
  }
}

/* --- Clase principal --- */
.animate-pulse-glow {
  animation: pulse-glow 2.2s ease-in-out infinite;
  overflow: hidden;
  position: relative;
}

/* --- Shimmer en brand-sand >>> se ve más fino --- */
.animate-pulse-glow::before {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(246, 239, 232, 0.85),
    /* sand */ transparent
  );
  transform: skewX(-25deg);
  animation: shimmer 2.8s infinite;
  z-index: 1;
}

/* --- Aura giratoria Terracotta --- */
.animate-pulse-glow::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;

  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(194, 123, 110, 0.6) 90deg,
    rgba(194, 123, 110, 0.85) 180deg,
    rgba(194, 123, 110, 0.6) 270deg,
    transparent 360deg
  );

  border-radius: 9999px;
  animation: rotating-aura 3s linear infinite;
  z-index: -1;
  filter: blur(18px);
}
</style>
