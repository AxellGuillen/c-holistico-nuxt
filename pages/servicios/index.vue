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
  <div class="min-h-screen bg-brand-base">
    <!-- ============================================ -->
    <!-- HERO SECTION -->
    <!-- ============================================ -->
    <section class="container mx-auto px-4 py-24 text-center relative z-10">
      <h1 class="text-6xl md:text-[100px] leading-none text-brand-terracotta mb-6 font-headlines">
        Nuestros Servicios
      </h1>
      <p class="text-xl md:text-2xl text-brand-terracotta/70 max-w-2xl mx-auto font-sans font-light leading-relaxed">
        Descubre las experiencias de sanación y bienestar diseñadas para ti.
      </p>
    </section>


    <nav class=" top-0 z-50 transition-all duration-300">
      <div class="bg-brand-base/95 backdrop-blur-xl border-y border-brand-clay/10 py-4 shadow-sm">
        <div class="container mx-auto px-4">
          <div class="flex gap-4 overflow-x-auto scrollbar-hide justify-start md:justify-center items-center pb-1">
            <button
              @click="changeCategory('all')"
              :class="[
                'px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm tracking-wide border',
                activeCategory === 'all'
                  ? 'bg-brand-terracotta text-white border-brand-terracotta shadow-md hover:bg-brand-terracotta/90'
                  : 'bg-white text-brand-terracotta/80 border-brand-clay/20 hover:border-brand-terracotta hover:text-brand-terracotta',
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
                  ? 'bg-brand-terracotta text-white border-brand-terracotta shadow-md hover:bg-brand-terracotta/90'
                  : 'bg-white text-brand-terracotta/80 border-brand-clay/20 hover:border-brand-terracotta hover:text-brand-terracotta',
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
    <section
      v-if="activeCategory !== 'all' && selectedCategory"
      class="container mx-auto px-4 py-10"
    >
      <div class="flex flex-col items-center justify-center text-center">
        <div class="w-16 h-1 bg-brand-terracotta/20 mb-6 rounded-full"></div>
        <h2 class="text-4xl font-bold text-brand-terracotta mb-3 font-headlines">
          {{ selectedCategory.name }}
        </h2>
        <p class="text-brand-terracotta/60 font-sans">
          Mostrando {{ filteredServices.length }} experiencia{{ filteredServices.length !== 1 ? "s" : "" }}
        </p>
      </div>
    </section>
    <div v-else class="h-10"></div> <!-- Spacer for 'all' view -->

    <!-- ============================================ -->
    <!-- GRID DE SERVICIOS -->
    <!-- ============================================ -->
    <section class="container mx-auto px-4 pb-24">
      <!-- LOADING -->
      <div v-if="!services" class="min-h-[40vh] flex items-center justify-center">
        <p class="text-xl text-brand-terracotta/50 font-light animate-pulse">Cargando experiencias...</p>
      </div>

      <!-- GRID -->
      <div
        v-else-if="filteredServices.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12"
      >
        <ServiceCard
          v-for="service in filteredServices"
          :key="service._id"
          :service="service"
        />
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="text-center py-20 bg-white/50 rounded-3xl border border-brand-clay/10 mx-auto max-w-2xl">
        <p class="text-2xl text-brand-terracotta/50 mb-6 font-headlines">
          No encontramos servicios en esta categoría.
        </p>
        <button
          @click="changeCategory('all')"
          class="bg-brand-terracotta hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
        >
          Ver todos los servicios
        </button>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- CTA: QUIZ -->
    <!-- ============================================ -->
    <section class="py-24 bg-brand-terracotta relative overflow-hidden">
      <!-- Decorative circles -->

      
    <!-- FILL WITH THE NEW SVG TO BETTER THE DESIGN -->


      <div class="container mx-auto px-4 text-center relative z-10">
        <h3 class="text-4xl md:text-5xl font-bold text-brand-base mb-6 font-headlines">
          ¿No estás seguro por dónde empezar?
        </h3>
        <p class="text-xl text-brand-base/80 mb-10 max-w-2xl mx-auto font-sans font-light">
          Responde nuestro quiz personalizado y te recomendaremos el servicio ideal para tu momento actual.
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

<style scoped>
/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
