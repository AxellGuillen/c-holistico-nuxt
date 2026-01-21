<script setup>
defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <section class="py-28 bg-surface rounded-2xl">
    <div class="section-content">
      <header class="mb-8 text-center mx-auto">
        <h2 class="mb-4 text-display-hero-mobile md:text-display-xl">
          {{ block.title }}
        </h2>
        <p class="text-body-lg text-content-muted max-w-lg mx-auto">
          {{ block.subtitle }}
        </p>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <article
          class="group bg-surface-muted rounded-card overflow-hidden flex flex-col shadow-soft transition-shadow duration-300 hover:shadow-medium"
          v-for="service in block.services"
          :key="service._id"
        >
          <div class="overflow-hidden">
            <NuxtImg
              v-if="service.thumbnail?.asset?._ref"
              provider="sanity"
              :src="service.thumbnail.asset._ref"
              :alt="service.thumbnail.alt || service.name"
              width="800"
              height="650"
              sizes="(max-width: 768px) 100vw, 33vw"
              format="webp"
              quality="80"
              loading="lazy"
              class="w-full object-cover aspect-4/5 transition-transform ease-out duration-300 group-hover:scale-105"
            />
          </div>

          <div class="text-center p-6 flex flex-col flex-grow">
            <h3 class="text-heading-lg-mobile md:text-heading-lg mb-2">
              {{ service.name }}
            </h3>

            <p class="text-body-sm mb-4 text-content-subtle">
              {{ service.shortDescription }}
            </p>
            <div class="mt-auto">
              <hr class="border-content/20 w-1/2 mx-auto my-4" />

              <p v-if="service.durations" class="text-body-md mb-4">
                <span class="text-content-muted">
                  {{ service.durations.minutes }}
                  <span class="text-content-subtle text-body-xs">min</span>
                </span>
                •
                <span class="text-body-md text-content-muted"
                  >${{ service.durations.price }}</span
                >
              </p>
              <NuxtLink :to="`/servicios?service=${service.slug.current}`">
                <button
                  class="mt-auto inline-flex items-center justify-center h-12 px-6 rounded-2xl font-medium transition-all duration-300 border w-full bg-accent text-content hover:bg-accent/90"
                >
                  Agendar cita
                </button>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
      <button
        class="block mx-auto px-6 py-3 rounded-full border text-content-muted hover:border-content/40 hover:text-content transition-colors"
      >
        Todos los servicios
      </button>
    </div>
  </section>
</template>
