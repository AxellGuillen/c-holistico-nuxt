// composables/useQuiz.js
import { ref, computed } from "vue";
import {
  QUIZ_CONFIG_QUERY,
  CATEGORIES_QUERY,
  CANDIDATE_SERVICES_QUERY,
} from "~/lib/quizQueries";

export const useQuiz = () => {
  // ===== ESTADO =====
  const sanity = useSanity();

  const config = ref(null);
  const categories = ref([]);
  const currentQuestionIndex = ref(0);
  const answers = ref([]); // Array de respuestas del usuario
  const isLoading = ref(false);
  const error = ref(null);
  const sessionStartTime = ref(null);
  // Scores acumulados por categoría
  const scores = ref({
    equilibrioEmocional: 0,
    sanacionEspiritual: 0,
    bienestarFisico: 0,
  });

  // Tags acumulados (para matching)
  const userTags = ref([]);

  // Servicio recomendado final
  const recommendedService = ref(null);

  // ===== COMPUTED =====
  const currentQuestion = computed(() => {
    if (!config.value?.questions) return null;
    return config.value.questions[currentQuestionIndex.value];
  });

  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);

  const isLastQuestion = computed(() => {
    if (!config.value?.questions) return false;
    return currentQuestionIndex.value === config.value.questions.length - 1;
  });

  const progress = computed(() => {
    if (!config.value?.questions) return 0;
    return Math.round(
      (currentQuestionIndex.value / config.value.questions.length) * 100
    );
  });

  // Scores en porcentaje (para indicadores visuales)
  const scoresPercentage = computed(() => {
    const total =
      scores.value.equilibrioEmocional +
      scores.value.sanacionEspiritual +
      scores.value.bienestarFisico;

    if (total === 0)
      return {
        equilibrioEmocional: 0,
        sanacionEspiritual: 0,
        bienestarFisico: 0,
      };

    return {
      equilibrioEmocional: Math.round(
        (scores.value.equilibrioEmocional / total) * 100
      ),
      sanacionEspiritual: Math.round(
        (scores.value.sanacionEspiritual / total) * 100
      ),
      bienestarFisico: Math.round((scores.value.bienestarFisico / total) * 100),
    };
  });

  // ===== MÉTODOS =====

  // Modificar startQuiz para trackear tiempo
  // Modificar startQuiz para trackear tiempo
  const startQuiz = () => {
    sessionStartTime.value = Date.now();
    currentView.value = "quiz";
  };

  const saveResult = async () => {
    if (!recommendedService.value || !config.value) {
      console.warn("⚠️ No hay resultado para guardar");
      return;
    }

    try {
      const sessionDuration = sessionStartTime.value
        ? Math.round((Date.now() - sessionStartTime.value) / 1000)
        : 0;

      const payload = {
        quizConfigId: config.value._id,
        recommendedServiceId: recommendedService.value._id,

        answers: answers.value,

        scores: scores.value,

        winningCategory: Object.keys(scores.value).reduce((a, b) =>
          scores.value[a] > scores.value[b] ? a : b
        ),

        userTags: userTags.value,

        userAgent: navigator.userAgent,

        sessionDuration,
      };

      console.log("📤 Enviando resultado a servidor:", payload);

      const response = await $fetch("/api/quiz-result", {
        method: "POST",
        body: payload,
      });

      console.log("✅ Resultado guardado en Sanity:", response.resultId);
    } catch (err) {
      console.error("❌ Error al guardar resultado:", err);
      // No hacer fail del quiz si falla el guardado
    }
  };

  /**
   * Fetch configuración del quiz y categorías
   */
  const fetchQuizData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Fetch paralelo de config y categorías promises.all devuelve siempre un array.
      const [quizConfig, categoriesData] = await Promise.all([
        sanity.fetch(QUIZ_CONFIG_QUERY),
        sanity.fetch(CATEGORIES_QUERY),
      ]);

      if (!quizConfig) {
        throw new Error("No se encontró configuración del quiz activa");
      }

      config.value = quizConfig;
      categories.value = categoriesData;

      console.log("Quiz config cargada:", quizConfig);
      console.log("Categorías cargadas:", categoriesData);
    } catch (err) {
      console.error("Error al cargar quiz:", err);
      error.value = "No se pudo cargar el quiz. Por favor recarga la página.";
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Procesar respuesta del usuario
   * @param {Object|Array} selectedAnswer - Respuesta(s) seleccionada(s)
   */
  const submitAnswer = (selectedAnswer) => {
    // Normalizar a array (por si es pregunta única)
    const answersArray = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : [selectedAnswer];

    console.log("📝 Procesando respuesta(s):", answersArray);

    // Guardar respuestas
    answers.value.push({
      questionId: currentQuestion.value._id,
      questionText: currentQuestion.value.questionText,
      answers: answersArray,
    });

    // Acumular puntajes y tags
    answersArray.forEach((answer) => {
      // 1. Acumular puntajes base
      const baseScores = answer.categoryScores;
      let multiplier = answer.intensityMultiplier || 1.0;

      scores.value.equilibrioEmocional +=
        baseScores.equilibrioEmocional * multiplier;
      scores.value.sanacionEspiritual +=
        baseScores.sanacionEspiritual * multiplier;
      scores.value.bienestarFisico += baseScores.bienestarFisico * multiplier;

      // 2. Agregar tag
      if (answer.answerValue && !userTags.value.includes(answer.answerValue)) {
        userTags.value.push(answer.answerValue);
      }
    });

    console.log("Scores actualizados:", scores.value);
    console.log("Tags acumulados:", userTags.value);
  };

  /**
   * Avanzar a siguiente pregunta
   */
  const nextQuestion = () => {
    if (!isLastQuestion.value) {
      currentQuestionIndex.value++;
    }
  };

  /**
   * Retroceder a pregunta anterior
   */
  const previousQuestion = () => {
    if (!isFirstQuestion.value) {
      currentQuestionIndex.value--;

      // Remover última respuesta y restar sus puntajes
      const lastAnswer = answers.value.pop();

      if (lastAnswer) {
        lastAnswer.answers.forEach((answer) => {
          const baseScores = answer.categoryScores;
          const multiplier = answer.intensityMultiplier || 1.0;

          scores.value.equilibrioEmocional -=
            baseScores.equilibrioEmocional * multiplier;
          scores.value.sanacionEspiritual -=
            baseScores.sanacionEspiritual * multiplier;
          scores.value.bienestarFisico -=
            baseScores.bienestarFisico * multiplier;

          // Remover tag
          const tagIndex = userTags.value.indexOf(answer.answerValue);
          if (tagIndex > -1) {
            userTags.value.splice(tagIndex, 1);
          }
        });
      }
    }
  };

  /**
   * Calcular resultado final
   */
  const calculateResult = async () => {
    isLoading.value = true;

    try {
      console.log("Calculando resultado...");
      console.log("Scores finales:", scores.value);
      console.log("Tags del usuario:", userTags.value);

      // 1. Identificar categoría ganadora
      const winningCategory = Object.keys(scores.value).reduce((a, b) =>
        scores.value[a] > scores.value[b] ? a : b
      );

      const winningScore = scores.value[winningCategory];

      console.log(
        `Categoría ganadora: ${winningCategory} con ${winningScore} puntos`
      );

      // 2. Fetch servicios candidatos de esa categoría
      const candidateServices = await sanity.fetch(CANDIDATE_SERVICES_QUERY, {
        categoryIdentifier: winningCategory,
        userScore: winningScore,
      });

      console.log(
        `Servicios candidatos encontrados: ${candidateServices.length}`
      );

      if (candidateServices.length === 0) {
        throw new Error(
          "No se encontraron servicios que cumplan los criterios"
        );
      }

      // 3. Filtrar y calcular score para cada servicio
      const scoredServices = candidateServices
        .map((service) => {
          // a) Verificar exclusiones
          const hasExcludedTag = service.matchCriteria.excludeTags?.some(
            (tag) => userTags.value.includes(tag)
          );

          if (hasExcludedTag) {
            console.log(`${service.name} excluido por tag`);
            return null;
          }

          // b) Contar coincidencias de tags preferidos
          const matchingTags =
            service.matchCriteria.preferredTags?.filter((tag) =>
              userTags.value.includes(tag)
            ) || [];

          // c) Calcular score base
          let finalScore = service.matchCriteria.priorityLevel || 1;

          // d) Agregar bonus por tags coincidentes
          finalScore += matchingTags.length * 2;

          // e) Override especial si tiene tag específico
          if (service.matchCriteria.overridePriorityIfTag) {
            const { tag, newPriority } =
              service.matchCriteria.overridePriorityIfTag;
            if (userTags.value.includes(tag)) {
              console.log(`${service.name} recibe OVERRIDE por tag "${tag}"`);
              finalScore = newPriority;
            }
          }

          console.log(
            `${service.name} - Score: ${finalScore} (${matchingTags.length} tags coinciden)`
          );

          return {
            ...service,
            matchingTags,
            finalScore,
          };
        })
        .filter(Boolean) // Remover nulos (servicios excluidos)
        .sort((a, b) => b.finalScore - a.finalScore); // Ordenar por score descendente

      if (scoredServices.length === 0) {
        throw new Error(
          "Todos los servicios fueron excluidos por tus preferencias"
        );
      }

      // 4. Seleccionar el ganador
      const winner = scoredServices[0];
      recommendedService.value = winner;

      console.log(`GANADOR: ${winner.name} con score ${winner.finalScore}`);

      await saveResult();

      return winner;
    } catch (err) {
      console.error("Error al calcular resultado:", err);
      error.value =
        "No se pudo calcular el resultado. Por favor intenta de nuevo.";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Reiniciar quiz
   */
  const resetQuiz = () => {
    currentQuestionIndex.value = 0;
    answers.value = [];
    scores.value = {
      equilibrioEmocional: 0,
      sanacionEspiritual: 0,
      bienestarFisico: 0,
    };
    userTags.value = [];
    recommendedService.value = null;
    error.value = null;
  };

  // ===== RETURN =====
  return {
    // Estado
    config,
    categories,
    currentQuestion,
    currentQuestionIndex,
    answers,
    scores,
    scoresPercentage,
    userTags,
    recommendedService,
    isLoading,
    error,

    // Computed
    isFirstQuestion,
    isLastQuestion,
    progress,

    // Métodos
    startQuiz,
    fetchQuizData,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    calculateResult,
    saveResult,
    resetQuiz,
  };
};
