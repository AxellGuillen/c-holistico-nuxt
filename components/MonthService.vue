<script setup>
defineProps(["block", "urlFor", "urlForPlaceholder"]);
</script>

<template>
  <div class="relative overflow-hidden bg-transparent">
    <!-- ========================================== -->
    <!-- MAIN GRID -->
    <!-- ========================================== -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] min-h-[500px] lg:min-h-[600px]"
    >
      <!-- ========================================== -->
      <!-- LEFT SIDE: IMAGE / VIDEO -->
      <!-- ========================================== -->
      <div
        class="relative overflow-hidden flex items-center justify-center p-6 md:p-8 lg:p-12 bg-brand-sand order-1 lg:order-1"
      >
        <div
          class="relative w-full max-w-[320px] md:max-w-[500px] aspect-[3/4] lg:aspect-square flex flex-col justify-between mx-auto max-h-[500px] md:max-h-[580px]"
        >
          <!-- MEDIA CONTAINER -->
          <div
            class="relative w-full h-[320px] md:h-[500px] mx-auto overflow-hidden md:w-[400px]"
            style="border-radius: 50% 50% 0 0 / 25% 25% 0 0"
          >
            <template v-if="block.video?.url">
              <video
                class="absolute inset-0 w-full h-full object-cover"
                autoplay
                muted
                loop
                playsinline
              >
                <source :src="block.video.url" type="video/webm" />
              </video>
            </template>

            <template v-else-if="block.backgroundImage?.url">
              <NuxtImg
                :src="block.backgroundImage.url"
                :alt="block.backgroundImage.alt || 'Imagen de fondo'"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </template>
          </div>

          <!-- BOTTOM INFO -->
          <div class="relative w-full flex justify-center mt-auto">
            <div
              class="flex items-center justify-center gap-6 md:gap-8 w-full md:w-[400px] px-3 md:px-4 py-1 bg-brand-terracotta/25 rounded-b-3xl mx-auto"
            >
              <!-- ICON -->
              <svg
                class="w-10 h-10 md:w-12 md:h-12 text-brand-sand drop-shadow-lg shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" />
                <path
                  d="M12 5L13 9L17 10L13 11L12 15L11 11L7 10L11 9L12 5Z"
                  fill="currentColor"
                  opacity="0.5"
                />
              </svg>

              <!-- PRICE + DATE -->
              <div class="flex flex-col items-end text-right pl-3">
                <div v-if="block.price" class="mb-2 md:mb-3">
                  <p
                    class="text-sm md:text-[18px] font-headlines uppercase tracking-wider text-brand-soft mb-1 md:pt-1"
                  >
                    Inversión
                  </p>
                  <div class="flex items-baseline justify-end gap-1">
                    <span class="text-xl md:text-2xl text-black font-headlines">
                      ${{ block.price.toLocaleString("es-MX") }}
                    </span>
                    <span class="text-xs font-medium text-black/70">MXN</span>
                  </div>
                </div>

                <div v-if="block.date">
                  <p
                    class="text-sm md:text-[18px] font-headlines uppercase tracking-wider text-brand-soft mb-1"
                  >
                    Próxima sesión
                  </p>
                  <span class="text-sm md:text-base font-sans text-black">
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
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- RIGHT SIDE: TEXT -->
      <!-- ========================================== -->
      <div
        class="relative flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12 lg:px-[10px] py-8 md:py-12 lg:py-0 bg-brand-soft overflow-hidden order-2 lg:order-2"
      >
        <div class="flex flex-col items-center gap-4 md:gap-6 max-w-2xl w-full">
          <svg
            class="w-10 h-10 sm:w-12 sm:h-12 text-brand-terracotta flex-shrink-0 animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            />
          </svg>

          <!-- TITLE -->
          <h2
            v-if="block.title"
            class="font-headlines text-5xl sm:text-7xl lg:text-9xl font-light leading-[0.95] tracking-tight text-brand-terracotta/90 w-full"
          >
            {{ block.title }}
          </h2>

          <!-- SUBTITLE -->
          <p
            v-if="block.subtitle"
            class="font-headlines text-xl sm:text-3xl lg:text-4xl font-light leading-tight text-black w-full"
          >
            {{ block.subtitle }}
          </p>

          <!-- CTA -->
          <NuxtLink
            v-if="block.slug?.current"
            :to="`/servicios/${block.slug.current}`"
            class="w-full flex justify-center pt-4 md:pt-[30px]"
          >
            <span
              v-if="block.ctaLabel"
              class="border border-white/90 px-6 md:px-7 py-3 rounded-full text-sm tracking-wider font-sans bg-brand-sand text-brand-terracotta flex items-center justify-center gap-3 w-[200px] md:w-[220px] btn-fill-hover"
            >
              <span class="text-left">{{ block.ctaLabel }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MARQUEE -->
    <!-- ========================================== -->
    <div
      class="relative w-full h-[80px] md:h-[100px] overflow-hidden bg-transparent"
    >
      <div
        class="marquee flex items-center justify-start h-full bg-brand-accent2"
      >
        <div class="marquee-inner whitespace-nowrap font-headlines uppercase">
          <span
            class="text-[32px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-brand-terracotta"
          >
            Servicio del Mes ~ Servicio del Mes ~ Servicio del Mes ~ Servicio
            del Mes ~ Servicio del Mes ~ Servicio del Mes ~
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 5%,
    rgba(0, 0, 0, 0.3) 10%,
    rgba(0, 0, 0, 0.6) 15%,
    black 25%,
    black 75%,
    rgba(0, 0, 0, 0.6) 85%,
    rgba(0, 0, 0, 0.3) 90%,
    rgba(0, 0, 0, 0.1) 95%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 5%,
    rgba(0, 0, 0, 0.3) 10%,
    rgba(0, 0, 0, 0.6) 15%,
    black 25%,
    black 75%,
    rgba(0, 0, 0, 0.6) 85%,
    rgba(0, 0, 0, 0.3) 90%,
    rgba(0, 0, 0, 0.1) 95%,
    transparent 100%
  );
}

.marquee-inner {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.btn-fill-hover {
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background-color: white;
  font-weight: 500;
  border-radius: 9999px;
  transition: border-color 0.6s ease, box-shadow 0.6s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}
.btn-fill-hover::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fcf2ed 0%, #e1cfba 100%);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 0;
}
.btn-fill-hover:hover::before {
  transform: scaleY(1);
}
.btn-fill-hover span,
.btn-fill-hover svg {
  position: relative;
  z-index: 1;
  color: #3e1404;
  transition: color 0.6s ease;
}
.btn-fill-hover:hover {
  border-color: #f6ccc4;
  box-shadow: 0 12px 32px rgba(246, 204, 196, 0.3);
}
</style>
