<script setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";

let cleanup = () => {}; // para poder matar triggers/observers luego

onMounted(async () => {
  await nextTick();

  // 1) Colecciona TODAS las secciones por atributo
  const sections = Array.from(document.querySelectorAll("[data-section]"));

  // 2) Inicializa GSAP/ScrollTrigger con esta lista
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  // Snap global tipo “pasa-página”
  const snapST = ScrollTrigger.create({
    trigger: document.body,
    start: 0,
    end: () => document.body.scrollHeight - innerHeight,
    snap: {
      snapTo: (v) => {
        const step = 1 / Math.max(sections.length - 1, 1);
        return Math.round(v / step) * step;
      },
      duration: 0.3,
      ease: "power1.inOut",
    },
  });

  // Timelines por sección (entrada/salida suave)
  const tls = sections.map((el, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse",
      },
    });
    tl.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6 }
    );
    return tl;
  });

  // Pin opcional en la primera sección (Hero)
  const pinST = ScrollTrigger.create({
    trigger: sections[0],
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
  });

  // Refresh en cambios de layout (evita desalineos)
  const ro = new ResizeObserver(() => ScrollTrigger.refresh());
  ro.observe(document.documentElement);

  // Guarda limpieza
  cleanup = () => {
    snapST.kill();
    pinST.kill();
    tls.forEach((t) => t.scrollTrigger && t.scrollTrigger.kill());
    ro.disconnect();
  };

  // (Lenis ya lo sincronizas en tu plugin lenis.client.ts)
});

onBeforeUnmount(() => cleanup());
</script>

<template>
  <main id="home">
    <HomeSection />
    <SectionAbout />
    <SectionGrid />
  </main>
</template>
