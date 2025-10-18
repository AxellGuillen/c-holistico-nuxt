<script setup>
import { query } from "~/lib/queries";

const { urlFor, urlForPlaceholder } = useSanityImage();
const { data } = await useSanityQuery(query);
const blocks = computed(() => data.value?.blocks || []);

useHead({
  title: data.value?.title || "Centro Holístico",
  meta: [
    {
      name: "description",
      content: data.value?.description || "",
    },
  ],
});
</script>

<template>
  <main class="home-container bg-brand-terracotta">
    <section
      v-for="block in blocks"
      :key="block._key"
      :id="block.id"
      :data-block-type="block._type"
      class="block-section relative w-full min-h-screen overflow-hidden"
    >
      <HeroBlock
        v-if="block._type === 'heroBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />

      <!-- ========================================== month service component-->
      <ServiceBlock
        v-else-if="block._type === 'monthServiceBlock'"
        :block="block"
        :urlFor="urlFor"
        :urlForPlaceholder="urlForPlaceholder"
      />
    </section>
  </main>
</template>
