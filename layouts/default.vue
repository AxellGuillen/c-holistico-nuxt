<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const query = groq`*[_type == "footerBlock"][0] {
  heading,
  contact,
  location,
  schedule,
  socialLinks,
  socialProof,
  legalDocuments {
    privacyPolicy { asset->{ url } },
    terms { asset->{ url } }
  },
  secondaryNavigation
}`;

const { data: block } = await useSanityQuery(query);

const isDarkCanvas = computed(() => {
  const darkRoutes = ["/servicios", "/quiz", "/about"];
  return darkRoutes.some((path) => route.path.startsWith(path));
});

const isHome = computed(() => route.path === "/");

const containerClass = computed(() => {
  if (isHome.value) return "site-container site-container--transparent";
  if (isDarkCanvas.value) return "site-container site-container--transparent";
  return "site-container";
});
</script>

<template>
  <div class="layout-root" :class="[isDarkCanvas ? 'layout-root--dark' : '']">
    <div :class="containerClass">
      <AppHeader />
      <main>
        <slot />
        <div class="pt-2">
          <AppFooter v-if="block" :block="block" />
        </div>
      </main>
    </div>
  </div>
</template>
