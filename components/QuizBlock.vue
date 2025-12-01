<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuiz } from "~/composables/useQuiz";

// Estado del flujo
const currentView = ref("loading"); // 'loading' | 'welcome' | 'quiz' | 'calculating' | 'result'

// Composable del quiz
const {
  config,
  categories,
  currentQuestion,
  isFirstQuestion,
  isLastQuestion,
  progress,
  scores,
  scoresPercentage,
  recommendedService,
  isLoading,
  error,

  fetchQuizData,
  submitAnswer,
  nextQuestion,
  previousQuestion,
  calculateResult,
  resetQuiz,
} = useQuiz();

// ===== LIFECYCLE =====
onMounted(async () => {
  await fetchQuizData();

  if (!error.value) {
    currentView.value = "welcome";
  }
});
watch(
  currentQuestion,
  (q) => {
    console.log("🎯 PREGUNTA ACTUAL COMPLETA:", JSON.stringify(q, null, 2));
  },
  { immediate: true, deep: true }
);

watch(
  recommendedService,
  (service) => {
    console.log("🎁 SERVICIO RECOMENDADO COMPLETO:", service);
    console.log("🎁 ¿Es null?", service === null);
    console.log("🎁 ¿Es undefined?", service === undefined);
    console.log("🎁 ¿Tiene .name?", service?.name);
    console.log("🎁 ¿Tiene .categoryInfo?", service?.categoryInfo);
    console.log("🎁 ¿Tiene .thumbnail?", service?.thumbnail);
  },
  { deep: true, immediate: true }
);

// ===== MÉTODOS =====
const startQuiz = () => {
  currentView.value = "quiz";
};

const handleAnswer = async (answer) => {
  // 1. Guardar respuesta
  submitAnswer(answer);

  // 2. Si es última pregunta, calcular resultado
  if (isLastQuestion.value) {
    currentView.value = "calculating";

    // Delay dramático de 1.5 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await calculateResult();
      currentView.value = "result";
    } catch (err) {
      currentView.value = "quiz"; // Volver al quiz si hay error
    }
  } else {
    // 3. Avanzar a siguiente pregunta
    nextQuestion();
  }
};

const handleBack = () => {
  previousQuestion();
};

const handleRestart = () => {
  resetQuiz();
  currentView.value = "welcome";
};
</script>

<template>
  <div class="w-full min-h-screen bg-brand-soft/100 flex justify-center">
    <div
      class="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-4 rounded-lg z-50 space-y-2"
    >
      <p><strong>view:</strong> {{ currentView }}</p>
      <p>
        <strong>currentQuestion:</strong>
        {{ currentQuestion?.questionText || "null" }}
      </p>
      <p><strong>categories:</strong> {{ categories?.length || 0 }}</p>
      <p><strong>isLoading:</strong> {{ isLoading }}</p>
      <p><strong>error:</strong> {{ error }}</p>
    </div>
    <!-- Loading -->
    <div
      class="w-full max-w-6xl mx-auto flex flex-col items-center justify-center"
    >
      <div v-if="currentView === 'loading'" class="text-center animate-pulse">
        <p class="font-headlines text-gray-600/80">Cargando quiz...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="quiz-error">
        <p>{{ error }}</p>
        <button @click="fetchQuizData">Reintentar</button>
      </div>

      <!-- Welcome -->
      <QuizWelcome
        v-else-if="currentView === 'welcome'"
        :config="config"
        @start="startQuiz"
      />

      <!-- Quiz -->
      <div v-else-if="currentView === 'quiz'" class="quiz-active">
        <!-- Progreso -->
        <QuizProgress :progress="progress" />

        <!-- Indicadores de categorías -->
        <QuizCategoryIndicators
          :categories="categories"
          :scores-percentage="scoresPercentage"
        />

        <!-- Pregunta actual -->
        <QuizQuestion
          :question="currentQuestion"
          :is-first="isFirstQuestion"
          :is-last="isLastQuestion"
          @answer="handleAnswer"
          @back="handleBack"
        />
      </div>

      <!-- Calculating -->
      <QuizCalculating
        v-else-if="currentView === 'calculating'"
        :message="config?.resultScreen?.calculatingMessage"
      />

      <!-- Result -->
      <QuizResult
        v-else-if="currentView === 'result'"
        :service="recommendedService"
        :config="config"
        @restart="handleRestart"
      />
    </div>
  </div>
</template>
