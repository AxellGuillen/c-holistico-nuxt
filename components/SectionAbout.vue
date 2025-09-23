<script setup>
const homeQuery = groq`
*[_type == "home"][0]{
  _id,
  title,
  headline,
  description,
  cta{
    label,
    url
  },
  videoFile{
    asset->{
      url,
      mimeType
    }
  },
  poster{
    asset->{
      url
    }
  }
}
`;

const { data } = await useSanityQuery(homeQuery);
</script>

<template>
  <section
    data-section="about"
    class="relative w-full h-[100svh] flex items-center justify-center bg-white text-black"
    aria-label="About"
  >
    <div class="w-full h-full flex items-center justify-center">
      <video
        v-if="data?.videoFile?.asset?.url"
        :src="data.videoFile.asset.url"
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover"
      ></video>
    </div>
  </section>
</template>
