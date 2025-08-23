import { defineNuxtPlugin } from "#app";
import Lenis from "@studio-freight/lenis";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const lenis = new Lenis({
      duration: 1.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Request animation frame for smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Reset scroll position when route changes
    nuxtApp.hook("page:finish", () => {
      lenis.scrollTo(0, { immediate: true });
    });

    // Inject Lenis into the Nuxt app context
    nuxtApp.provide("lenis", lenis);
  }
});
