<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#app";
import { CATEGORIES_QUERY, SERVICES_QUERY } from "~/lib/servicesQuery";

const route = useRoute();
const router = useRouter();

const { data: services } = await useSanityQuery(SERVICES_QUERY);
const { data: categories } = await useSanityQuery(CATEGORIES_QUERY);

const categorys = computed(() => {
  return categories.value || [];
});

const activeCategory = ref(route.query.categoria || "all");

const filteredServices = computed(() => {
  if (!services.value) {
    return [];
  }

  if (activeCategory.value === "all") {
    return services.value;
  }

  // LIST OF SLUGS BY SERVICE
  const filtered = services.value.filter((service) => {
    const categorySlug = service?.category?.slug?.current;

    if (!categorySlug) {
      return false;
    }
    return categorySlug === activeCategory.value;
  });

  return filtered;
});

const changeCategory = (slug) => {
  activeCategory.value = slug;

  if (slug === "all") {
    router.push("/servicios");
  } else {
    router.push(`/servicios?categoria=${slug}`);
  }
};

watch(
  () => route.query.categoria,
  (newCategory) => {
    activeCategory.value = newCategory || "all";
  }
);

const selectedCategory = computed(() => {
  if (!categories.value) return null;

  return categories.value.find(
    (cat) => cat?.slug?.current === activeCategory.value
  );
});

useHead({
  title:
    activeCategory.value === "all"
      ? "Nuestros Servicios - Raíces Centro Holístico"
      : `${selectedCategory.value?.name || "Servicios"} - Raíces`,
  meta: [
    {
      name: "description",
      content: `Descubre nuestros servicios de ${
        selectedCategory.value?.name?.toLowerCase() || "bienestar holístico"
      }`,
    },
  ],
});
</script>

<template>
  <div class="relative min-h-screen bg-brand-sand text-white overflow-hidden">
    <!-- Background with Overlay (matching about page) -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/95"
      ></div>
    </div>

    <!-- ============================================ -->
    <!-- HERO SECTION -->
    <!-- ============================================ -->
    <section class="container mx-auto px-8 py-20 text-center relative z-10">
      <h1
        class="font-headlines text-8xl md:text-9xl font-light leading-none mb-4 tracking-tight md:text-start text-center text-white"
      >
        Nuestros Servicios
      </h1>
      <div class="h-px w-32 bg-white/30 mt-8"></div>
    </section>

    <nav class="top-0 z-50 transition-all duration-300">
      <div class="backdrop-blur-xl py-4">
        <div class="container mx-auto px-4">
          <div
            class="flex gap-4 overflow-x-auto scrollbar-hide justify-start md:justify-start items-center pb-8 pl-3"
          >
            <button
              @click="changeCategory('all')"
              :class="[
                'px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm tracking-wide border',
                activeCategory === 'all'
                  ? 'bg-brand-sand text-brand-terracotta border-brand-sand shadow-md hover:bg-brand-sand/90'
                  : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10',
              ]"
            >
              Todos
            </button>

            <button
              v-for="cat in categorys"
              :key="cat._id"
              @click="changeCategory(cat.slug.current)"
              :class="[
                'px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm tracking-wide border',
                activeCategory === cat.slug.current
                  ? 'bg-brand-sand text-brand-terracotta border-brand-sand shadow-md hover:bg-brand-sand/90'
                  : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10',
              ]"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- ============================================ -->
    <!-- HEADER DE CATEGORÍA -->
    <!-- ============================================ -->
    <!-- Product cards grid layout -->
    <div class="container mx-auto px-5 sm:px-8 py-8 relative z-10">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <template v-for="service in filteredServices" :key="service._id">
          <NuxtLink
            v-if="service.durations?.length"
            :to="`/servicios/${service.slug?.current}`"
            class="group cursor-pointer bg-transparent border-x border-white/30 px-4 py-6 block"
          >
            <!-- Title Section -->
            <div class="mb-6">
              <h2
                class="sm:text-3xl text-2xl tracking-widest uppercase font-headlines mb-1 text-white"
              >
                {{ service.name }}
              </h2>
              <p
                class="text-sm leading-relaxed text-white mb-4 font-bold font-sans pt-1"
              >
                {{ service.shortDescription }}
              </p>
            </div>

            <!-- Price -->
            <div
              class="text-4xl font-light text-white flex justify-end font-sans pt-5"
            >
              MXN $ {{ service.durations?.[0].price }}
            </div>
            <div class="relative mb-4 overflow-hidden">
              <NuxtImg
                :src="service.thumbnail?.asset?.url"
                :alt="service.name"
                class="w-full aspect-[4/3] object-contain object-center transition-transform duration-500 group-hover:scale-105"
              />
              <!-- Bottom Left Label -->
              <div
                class="absolute bottom-4 left-4 backdrop-blur-sm px-4 py-2 rounded-sm"
              >
                <span
                  class="text-xs tracking-wider uppercase font-medium text-white font-sans"
                >
                  {{ service.durations?.[0].minutes }} mins
                </span>
              </div>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- CTA: QUIZ -->
    <!-- ============================================ -->
    <section class="py-24 bg-transparent relative overflow-hidden">
      <div class="container mx-auto px-4 text-center relative z-10">
        <h3
          class="font-headlines text-4xl md:text-7xl font-light leading-none mb-4 tracking-tight md:text-center text-center text-white"
        >
          ¿No estás seguro por dónde empezar?
        </h3>
        <p
          class="md:text-xl text-base text-brand-base/80 mb-10 max-w-2xl mx-auto font-sans font-bold"
        >
          Responde nuestro quiz personalizado y te recomendaremos el servicio
          ideal para tu momento actual.
        </p>
        <NuxtLink to="/quiz">
          <button
            class="bg-brand-base text-brand-terracotta px-10 py-4 rounded-full text-lg font-bold hover:bg-white transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            Descubre tu Camino
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
