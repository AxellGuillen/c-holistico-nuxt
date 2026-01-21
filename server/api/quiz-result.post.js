import { createClient } from "@sanity/client";

const sanityServer = createClient({
  projectId: process.env.NUXT_SANITY_PROJECT_ID,
  dataset: process.env.NUXT_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.NUXT_SANITY_TOKEN,
  useCdn: false,
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validar datos mínimos
    if (!body.quizConfigId || !body.recommendedServiceId) {
      throw createError({
        statusCode: 400,
        message: "Faltan datos requeridos",
      });
    }

    // Crear documento en Sanity
    const result = await sanityServer.create({
      _type: "quizResult",

      timestamp: new Date().toISOString(),

      quizConfig: {
        _type: "reference",
        _ref: body.quizConfigId,
      },

      answers: body.answers.map((answer) => ({
        _type: "object",
        questionId: answer.questionId,
        questionText: answer.questionText,
        selectedAnswers: answer.answers.map((a) => a.answerText),
      })),

      scores: body.scores,

      winningCategory: body.winningCategory,

      recommendedService: {
        _type: "reference",
        _ref: body.recommendedServiceId,
      },

      userTags: body.userTags,

      didConvert: false, // Por defecto false, se marca manual después

      userAgent: body.userAgent || "unknown",

      sessionDuration: body.sessionDuration || 0,
    });

    return {
      success: true,
      resultId: result._id,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error al guardar resultado del quiz",
    });
  }
});
