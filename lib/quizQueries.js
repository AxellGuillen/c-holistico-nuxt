// lib/sanity.queries.js

// ===== QUERY 1: Obtener configuración del quiz =====
export const QUIZ_CONFIG_QUERY = `
*[_type == "quizConfiguration" && isActive == true][0] {
  _id,
  title,
  welcomeScreen {
    headline,
    subtitle,
    estimatedTime,
    startButtonText,
    backgroundImage {
      asset->{
        _id,
        url
      }
    }
  },
  resultScreen {
    calculatingMessage,
    resultHeadline,
    showCategoryBadge
  },
  
  "questions": questions[]-> {
    _id,
    questionText,
    subtitle,
    questionType,
    minSelections,
    maxSelections,
    isRequired,
    
    answers[] {
      answerText,
      "answerValue": answerValue.current,
      categoryScores {
        equilibrioEmocional,
        sanacionEspiritual,
        bienestarFisico
      },
      intensityMultiplier
    }
  }
}
`;

// ===== QUERY 2: Obtener categorías (para indicadores visuales) =====
export const CATEGORIES_QUERY = `
*[_type == "category"] | order(name asc) {
  _id,
  name,
  identifier,
  tagline,
  color {
    hex
  }
}
`;

// ===== QUERY 3: Obtener servicios candidatos =====
// Esta query se ejecuta DESPUÉS de calcular el resultado
// Recibe parámetros: $categoryIdentifier y $userScore
export const CANDIDATE_SERVICES_QUERY = `
*[_type == "subservice" 
  && category->identifier == $categoryIdentifier
  && matchCriteria.minimumCategoryScore <= $userScore
  && isActive == true] {
  _id,
  name,
  slug {
    current
  },
  shortDescription,
  benefits,
  idealFor,
  thumbnail {
    asset->{
      _id,
      url
    }
  },
  duration,
  format,
  price,
  currency,
  ctaText,
  ctaUrl,
  ctaType,
  
  matchCriteria {
    minimumCategoryScore,
    preferredTags,
    excludeTags,
    priorityLevel,
    overridePriorityIfTag {
      tag,
      newPriority
    }
  },
  
  "categoryInfo": category-> {
    name,
    identifier,
    tagline,
    color {
      hex
    }
  }
}
`;

// ===== MUTATION: Guardar resultado del quiz =====
export const CREATE_QUIZ_RESULT_MUTATION = `
mutation($data: QuizResultInput!) {
  createQuizResult(data: $data) {
    _id
    _createdAt
  }
}
`;
