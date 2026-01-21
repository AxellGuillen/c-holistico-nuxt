<script setup>
defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <section class="py-16 md:py-28 bg-surface rounded-2xl">
    <div class="section-content--left">
      <header class="mb-12">
        <div class="flex flex-col md:flex-row md:items-end gap-4">
          <h2 class="text-display-xl md:text-display-lg max-w-2xl">
            Conoce nuestro equipo de terapeutas especializados.
          </h2>
          <p class="text-body-md text-content-muted max-w-md">
            Profesionales con formación en terapias integrativas y cuidado
            corporal.
          </p>
        </div>
      </header>

      <div class="flex overflow-x-auto gap-6 pb-4 snap-x snap-proximity">
        <article
          v-for="therapist in block.therapists"
          :key="therapist._id"
          class="shrink-0 w-72 h-[460px] snap-start"
        >
          <NuxtImg
            :src="therapist.imageUrl"
            :alt="therapist.name"
            width="800"
            height="650"
            format="webp"
            quality="80"
            loading="lazy"
            class="w-full h-96 object-cover rounded-card"
          />
          <div class="pt-2 flex flex-col gap-2">
            <h3 class="text-heading-lg">{{ therapist.name }}</h3>
            <p
              class="text-body-md text-content-muted line-clamp-2 overflow-hidden"
            >
              {{ therapist.shortBio }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
