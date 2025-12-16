<script setup>
import { ref, onMounted } from "vue";
import { useQuiz } from "~/composables/useQuiz";

useHead({
  title: "Quiz | Raices Centro Holístico",
  meta: [
    {
      name: "description",
      content:
        "Servicios y experiencias de bienestar holístico. Descubre terapias, viajes terapéuticos y próximos lanzamientos en nuestro centro.",
    },
    {
      name: "keywords",
      content:
        "servicios holísticos, terapias, bienestar, viajes terapéuticos, centro holístico",
    },
  ],
});

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
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
  <div class="w-full min-h-screen bg-transparent flex justify-center relative">
    <div
      class="fixed inset-0 bg-brand-sand bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/95 -z-10"
    ></div>
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
