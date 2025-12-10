// ~/plugins/gsap.client.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable);

ScrollTrigger.config({ ignoreMobileResize: true });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("gsap", gsap);
  nuxtApp.provide("SplitText", SplitText);
  nuxtApp.provide("draggable", Draggable);
});
