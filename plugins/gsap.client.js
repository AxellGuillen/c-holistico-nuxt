// ~/plugins/gsap.client.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("gsap", gsap);
});
