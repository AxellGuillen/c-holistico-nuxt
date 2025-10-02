<script setup>
const query = groq`
  *[_type == "home"][0]{
    title,
    blocks[] {
      _key,
      _type,
      id,
      title,
      subtitle,
      "backgroundImage": backgroundImage.asset->{
        url,
        "alt": coalesce(^.alt, asset->altText)
      },
      "backgroundVideo": backgroundVideo.asset->{
        url
      }
    }
  }
`;
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
  <main>
    <section
      v-for="(block, i) in blocks"
      :key="block._key ?? i"
      :id="block.id"
      :data-block-type="block._type"
      class="block-section relative w-full h-screen overflow-hidden"
    >
      <!-- HERO -->
      <template v-if="block._type === 'heroBlock'">
        <!-- Video background (preferido) -->
        <video
          v-if="block.backgroundVideo?.url"
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
        >
          <source :src="block.backgroundVideo.url" type="video/webm" />
        </video>

        <!-- Fallback imagen -->
        <NuxtImg
          v-else-if="block.backgroundImage?.url"
          :src="block.backgroundImage.url"
          :alt="block.backgroundImage.alt || ''"
          class="absolute inset-0 w-full h-full object-cover"
        />

        <!-- overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <div
          class="relative z-10 w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        >
          <div class="max-w-3xl" ref="heroContentRefs">
            <h1
              class="text-4xl md:text-9xl leading-tight font-headlines tracking-tight flex justify-center"
              data-text-reveal
            >
              {{ block.title }}
            </h1>
            <p
              class="mt-6 text-xl md:text-2xl font-thin italic leading-snug text-center md:text-left"
              data-text-reveal
            >
              {{ block.subtitle }}
            </p>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="relative z-10 p-8">
          <h3 class="text-xl font-medium">{{ block.title }}</h3>
          <p>{{ block.subtitle }}</p>
        </div>
      </template>
    </section>
  </main>
</template>
