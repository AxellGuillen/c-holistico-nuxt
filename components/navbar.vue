<script setup>
const baseLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Statement",
    path: "/statement",
    hasDropdown: true,
    options: [],
  },
  {
    label: "Store",
    path: "/store",
    hasDropdown: true,
    options: [
      {
        label: "El mar",
        path: "/publicaciones/el-mar",
      },
      {
        label: "Crónicas nocturnas",
        path: "/publicaciones/cronicas-nocturnas",
      },
    ],
  },
];
</script>

<template>
  <div class="w-full flex h-[100px] mt-[10px]">
    <div class="w-[200px] md:flex flex-col gap-[5px] ml-5 mt-[5px]">
      <nuxt-link
        :to="link.path"
        :key="link.label"
        v-for="link in baseLinks"
        class="text-sm md:text-lg"
        >{{ link.label }}
      </nuxt-link>
    </div>
    <div class="md:w-[500px] h-[100px] flex justify-end md:justify-center">
      <p class="font-headlines text-7xl md:text-9xl mt-[10px] font-medium">
        Ternurx
      </p>
    </div>
  </div>
</template>
