<script setup lang="ts">
import { PortableText } from "@portabletext/vue";

const { urlFor, urlForPlaceholder } = useSanityImage();

interface EssayData {
  dek?: string;
  byline?: string;
  kicker?: string;
  lead?: string;
  body?: any[];
  pullQuotes?: { quote: string; attribution?: string }[];
  sideNotes?: { content: string }[];
  cover?: {
    asset?: { _ref?: string; _id?: string };
    alt?: string;
    caption?: string;
  };
  caption?: string;
  footnotes?: string[];
}

const props = defineProps<{
  title: string;
  data?: EssayData;
}>();

const essay = computed(() => ({
  dek: props.data?.dek ?? "",
  byline: props.data?.byline ?? "",
  kicker: props.data?.kicker ?? "",
  lead: props.data?.lead ?? "",
  body: Array.isArray(props.data?.body) ? props.data!.body : [],
  pullQuotes: props.data?.pullQuotes ?? [],
  sideNotes: props.data?.sideNotes ?? [],
  cover: props.data?.cover ?? undefined,
  caption: props.data?.caption ?? "",
  footnotes: props.data?.footnotes ?? [],
}));
</script>

<template>
  <section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="font-bold leading-tight text-[clamp(2.5rem,6vw,5rem)] mb-6">
        {{ props.title }}
      </h1>
      <div class="grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div class="col-span-12 md:col-span-5 lg:col-span-5 space-y-6">
          <p class="text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed">
            <PortableText :value="essay.body" />
          </p>
        </div>
        <div class="w-[600px]">
          <NuxtImg
            :src="essay.cover?.asset ? urlFor(essay.cover.asset) : ''"
            :alt="essay.cover?.alt || 'Cover image'"
            class="w-full h-auto object-cover -2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
</style>
