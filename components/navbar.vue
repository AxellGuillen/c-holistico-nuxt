<script setup>
const baseLinks = [
  {
    label: "Inicio",
    path: "/",
  },
  {
    label: "proyectos",
    path: "/proyectos",
    hasDropdown: true,
    options: [],
  },
  {
    label: "publicaciones",
    path: "/publicaciones",
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
  {
    label: "bio",
    path: "/bio",
  },
];
</script>

<template>
  <div class="w-full">
    <div
      v-for="link in baseLinks"
      class="flex justify-between w-full font-bold"
    >
      {{ link.label }}
    </div>
  </div>
</template>
