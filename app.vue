<script setup></script>

<template>
  <div>
    <RaicesLoader />

    <NuxtLayout>
      <NuxtPage :keepalive="{ include: ['index'] }" />
    </NuxtLayout>
  </div>
</template>

<style>
html:has(.loader-container) {
  overflow: hidden;
}
</style>
