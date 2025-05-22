<script setup>
const query = groq`*[_type == "projects"] | order(orderRank) {
  _id,
  title,
  slug,
  coverImage,
  body
}`;
const { urlFor } = useSanityImage();

const config = useRuntimeConfig();

const { data: projects, error } = await useSanityQuery(query);
</script>

<template>
  <div
    class="h-screen flex flex-col justify-center items-center w-full bg-white"
  >
    <div v-for="project in projects" :key="project._id">
      <h2 class="text-center">{{ project.title }}</h2>
      <img
        v-if="project.coverImage"
        :src="urlFor(project.coverImage).width(500).url()"
        alt="Cover Image"
      />
    </div>
  </div>
</template>
