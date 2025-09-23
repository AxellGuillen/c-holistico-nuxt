<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const el = ref([]); // array de refs
let splits = []; // instancias de SplitText
let originals = []; // orden original por item

function shuffleArray(arr) {
  return gsap.utils.shuffle(arr.slice());
}

function swapOrder(chars, toOrder) {
  gsap.to(toOrder, {
    opacity: 0,
    duration: 0.08,
    stagger: 0.03,
    onComplete: () => {
      const parent = chars[0].parentNode;
      toOrder.forEach((ch) => parent.appendChild(ch));
      gsap.to(toOrder, { opacity: 1, duration: 0.12, stagger: 0.03 });
    },
  });
}

function makeHandlers(index) {
  return {
    enter: () => {
      const chars = splits[index].chars;
      const shuffled = shuffleArray(chars);

      gsap.to(shuffled, {
        opacity: 0,
        duration: 0.01,
        stagger: 0.03,
        onComplete: () => {
          const parent = chars[0].parentNode;
          shuffled.forEach((ch) => parent.appendChild(ch));

          gsap.to(shuffled, {
            opacity: 1,
            duration: 0.12,
            stagger: 0.03,
            onComplete: () => {
              // vuelve al orden original
              swapOrder(chars, originals[index]);
            },
          });
        },
      });
    },
  };
}

onMounted(() => {
  el.value.forEach((span, i) => {
    const split = new SplitText(span, { type: "chars" });
    splits[i] = split;
    originals[i] = split.chars.slice();

    // Evita colapso de espacios y asegura bloque por carácter
    span.style.whiteSpace = "pre";
    split.chars.forEach((c) => {
      if (c.textContent === " ") c.textContent = "\u00A0";
      c.style.display = "inline-block"; // lo tuyo de antes
    });

    const { enter } = makeHandlers(i);
    span.addEventListener("mouseenter", enter);
    span._handlers = { enter };
  });
});

onBeforeUnmount(() => {
  el.value.forEach((span, i) => {
    if (span._handlers) {
      span.removeEventListener("mouseenter", span._handlers.enter);
    }
    splits[i]?.revert();
  });
});

const props = defineProps({
  list: { type: Array, required: true },
});

const emit = defineEmits(["select"]);
</script>

<template>
  <div class="space-y-2">
    <div v-for="names in list" :key="names.slug">
      <button @click="emit('select', names.slug)">
        <span
          ref="el"
          class="inline-block select-none cursor-pointer text-[13px] uppercase"
        >
          {{ names.title }}
        </span>
      </button>
    </div>
  </div>
</template>
