<script setup>
const props = defineProps({
  service: Object,
  config: Object,
});

const emit = defineEmits(["restart"]);

const getCTAIcon = (ctaType) => {
  switch (ctaType) {
    case "whatsapp":
      return "💬";
    case "calendar":
      return "📅";
    case "contact":
      return "📧";
    default:
      return "✨";
  }
};
</script>

<template>
  <div class="quiz-result">
    <!-- Badge de categoría -->

    <div v-if="config?.resultScreen?.showCategoryBadge" class="category-badge">
      {{ service.categoryInfo.name }}
    </div>

    <!-- Título -->
    <h2 class="result-title">
      {{ config?.resultScreen?.resultHeadline || "✨ Tu Servicio Ideal" }}
    </h2>

    <!-- Tarjeta del servicio -->
    <div class="service-card">
      <!-- Imagen -->
      <div v-if="service.thumbnail" class="service-image">
        <img :src="service.thumbnail.asset.url" :alt="service.name" />
      </div>

      <!-- Contenido -->
      <div class="service-content">
        <h3 class="service-name">{{ service.name }}</h3>

        <p class="service-description">{{ service.shortDescription }}</p>

        <!-- Beneficios -->
        <div class="service-benefits">
          <h4 class="benefits-title">Beneficios:</h4>
          <ul class="benefits-list">
            <li v-for="(benefit, index) in service.benefits" :key="index">
              ✨ {{ benefit }}
            </li>
          </ul>
        </div>

        <!-- Ideal para -->
        <div v-if="service.idealFor" class="service-ideal">
          <h4 class="ideal-title">Ideal para:</h4>
          <ul class="ideal-list">
            <li v-for="(profile, index) in service.idealFor" :key="index">
              • {{ profile }}
            </li>
          </ul>
        </div>

        <!-- Metadata -->
        <div class="service-metadata">
          <span class="metadata-item"> ⏱️ {{ service.duration }} </span>
          <span class="metadata-item">
            📍
            {{
              service.format === "presencial"
                ? "Presencial"
                : service.format === "online"
                ? "Online"
                : "Presencial u Online"
            }}
          </span>
          <span v-if="service.price" class="metadata-item">
            💰 ${{ service.price }} {{ service.currency }}
          </span>
        </div>

        <!-- Matching info (debug - remover en producción) -->
        <div v-if="service.matchingTags?.length" class="service-match-info">
          <p class="match-score">Score: {{ service.finalScore }} puntos</p>
          <p class="match-tags">
            Coincidencias: {{ service.matchingTags.join(", ") }}
          </p>
        </div>

        <!-- CTA -->
        <a
          :href="service.ctaUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="service-cta"
        >
          {{ getCTAIcon(service.ctaType) }} {{ service.ctaText }}
        </a>
      </div>
    </div>

    <!-- Opciones adicionales -->
    <div class="result-actions">
      <button @click="emit('restart')" class="btn-restart">
        🔄 Hacer el quiz nuevamente
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz-result {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.category-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.result-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.service-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.service-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-content {
  padding: 2rem;
}

.service-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.service-description {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.service-benefits,
.service-ideal {
  margin-bottom: 1.5rem;
}

.benefits-title,
.ideal-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #374151;
}

.benefits-list,
.ideal-list {
  list-style: none;
  padding: 0;
}

.benefits-list li,
.ideal-list li {
  padding: 0.5rem 0;
  color: #6b7280;
  line-height: 1.5;
}

.service-metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.metadata-item {
  font-size: 0.875rem;
  color: #6b7280;
}

.service-match-info {
  padding: 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.match-score {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.match-tags {
  color: #92400e;
}

.service-cta {
  display: block;
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.result-actions {
  margin-top: 2rem;
  text-align: center;
}

.btn-restart {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-restart:hover {
  background: #e5e7eb;
}
</style>
