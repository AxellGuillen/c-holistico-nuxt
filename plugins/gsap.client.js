// ~/plugins/gsap.client.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

ScrollTrigger.config({ ignoreMobileResize: true });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("gsap", gsap);
  nuxtApp.provide("SplitText", SplitText);
});
