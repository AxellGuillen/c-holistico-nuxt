<script setup>
import { PortableText } from "@portabletext/vue";

defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <div
    class="relative grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden md:h-screen"
  >
    <!-- ========================================== -->
    <!-- Left Side: Content -->
    <!-- ========================================== -->
    <div
      class="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 bg-gradient-to-br from-brand-neutralLight via-brand-accent2 to-brand-secondary text-brand-neutralDark h-full"
    >
      <div class="max-w-2xl mx-auto lg:mx-0 w-full py-8 lg:py-0">
        <!-- Small Label -->
        <div class="mb-8">
          <div
            class="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-brand-primary bg-brand-accent2 px-4 py-2 rounded-full"
          >
            <span
              class="w-2 h-2 bg-brand-accent1 rounded-full animate-pulse font-headlines"
            ></span>
            Servicio del Mes
          </div>
        </div>

        <!-- Title -->
        <h2
          v-if="block.title"
          class="text-4xl sm:text-5xl lg:text-6xl font-headlines font-bold leading-[1.1] tracking-tight text-brand-neutralDark mb-6"
          data-text-fade
        >
          {{ block.title }}
        </h2>

        <!-- Subtitle (Quote Style) -->
        <blockquote
          v-if="block.subtitle"
          class="relative pl-6 border-l-4 border-brand-primary text-xl sm:text-2xl font-light italic leading-relaxed text-brand-neutralDark/80 mb-8"
        >
          <span
            class="absolute -left-2 -top-2 text-6xl text-brand-accent2 font-headlines"
            >"</span
          >
          {{ block.subtitle }}
        </blockquote>

        <!-- Description -->
        <div v-if="block.description" class="prose-brand max-w-none text-left">
          <PortableText
            :value="block.description"
            class="text-base sm:text-lg leading-loose text-brand-neutralDark tracking-wide font-sans"
          />
        </div>

        <!-- Decorative Divider -->
        <div class="flex items-center gap-3 pt-5">
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-brand-accent2 to-transparent"
          ></div>
          <div class="w-2 h-2 bg-brand-accent1 rounded-full"></div>
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-brand-accent2 to-transparent"
          ></div>
        </div>

        <!-- Price & Date -->
        <div class="flex flex-wrap gap-4 mt-5">
          <div
            v-if="block.price"
            class="flex-1 min-w-[140px] bg-brand-neutralLight/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-brand-accent2"
          >
            <p
              class="text-xs font-medium font-sans uppercase tracking-wider text-brand-primary mb-2"
            >
              Inversión
            </p>
            <div class="flex items-baseline gap-1">
              <span
                class="text-3xl font-bold text-brand-neutralDark font-headlines"
              >
                ${{ block.price.toLocaleString("es-MX") }}
              </span>
              <span class="text-sm font-medium text-brand-neutralDark/70"
                >MXN</span
              >
            </div>
          </div>

          <div
            v-if="block.date"
            class="flex-1 min-w-[180px] bg-brand-neutralLight/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-brand-accent2"
          >
            <p
              class="text-xs font-medium font-sans uppercase tracking-wider text-brand-primary mb-2"
            >
              Próxima Sesión
            </p>
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold text-black">
                {{
                  new Date(block.date).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <a
          v-if="block.ctaLabel"
          href="#contacto"
          class="mt-5 group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-6 bg-gradient-to-r from-brand-accent1 via-brand-accent1 to-brand-accent1 text-brand-neutralDark rounded-full font-headlines text-xl sm:text-2xl font-semibold shadow-2xl shadow-brand-accent1/40 hover:shadow-brand-accent1/60 hover:scale-105 transition-all duration-300 overflow-hidden mb-6"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
          ></span>

          <span
            class="relative z-10 flex items-center justify-center gap-2 text-black"
          >
            {{ block.ctaLabel }}
          </span>

          <span
            class="transform group-hover:translate-x-1 transition-transform duration-300"
          >
            →
          </span>
        </a>

        <!-- Trust Badge -->
        <div class="flex items-center gap-2 text-sm text-brand-neutralDark/70">
          <svg
            class="w-5 h-5 text-brand-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Cupos limitados • Reserva tu lugar ahora</span>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- Right Side: Image / Video -->
    <!-- ========================================== -->
    <div
      class="relative w-full h-[60vh] sm:h-[70vh] md:h-full min-h-[300px] lg:min-h-screen overflow-hidden"
    >
      <div class="relative w-full h-full">
        <video
          v-if="block.video?.url"
          :src="block.video.url"
          autoplay
          muted
          loop
          playsinline
          class="absolute inset-0 w-full h-full object-cover object-center md:object-center"
        ></video>

        <NuxtImg
          v-else-if="block.image?.url"
          :src="block.image.url"
          :alt="block.image.alt || 'Servicio del mes'"
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        <div
          v-else
          class="absolute inset-0 bg-gradient-to-br from-brand-accent2 via-brand-secondary to-brand-accent1"
        ></div>
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-transparent to-brand-neutralDark/40"
      ></div>

      <div
        class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-neutralDark/40 to-transparent"
      ></div>

      <div
        class="absolute top-10 right-10 w-32 h-32 bg-brand-accent2/20 backdrop-blur-md rounded-full animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 left-10 w-24 h-24 bg-brand-secondary/20 backdrop-blur-md rounded-full animate-bounce"
        style="animation-duration: 3s"
      ></div>

      <div
        v-if="block.backgroundImage?.alt"
        class="absolute bottom-6 right-6 text-brand-neutralLight/80 text-xs font-light backdrop-blur-sm bg-brand-neutralDark/40 px-3 py-1 rounded-full"
      >
        {{ block.backgroundImage.alt }}
      </div>
    </div>
  </div>
</template>
