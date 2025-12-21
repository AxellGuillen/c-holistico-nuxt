<script setup>
import { ref, computed, onMounted } from "vue";
import { useHead } from "#app";
import { useRoute } from "#app";
import { SERVICE_BY_SLUG_QUERY } from "~/lib/servicesQuery";

const route = useRoute();
const { slug } = route.params;

const { data: service } = await useSanityQuery(SERVICE_BY_SLUG_QUERY, { slug });

const selectedImage = ref(0);
const selectedDuration = ref(null);

const selectedDate = ref("");
const selectedTime = ref("");
const quantity = ref(1);

const allImages = computed(() => {
  const images = [];
  if (service.value.thumbnail) {
    images.push(service.value.thumbnail.asset.url);
  }
  if (service.value?.gallery?.length) {
    service.value.gallery.forEach((img) => {
      if (img.asset?.url) {
        images.push(img.asset.url);
      }
    });
  }
  return images;
});

const currentPrice = computed(() => {
  if (!service.value?.durations) return null;

  if (selectedDuration.value) {
    return service.value.durations.find(
      (duration) => duration.minutes === selectedDuration.value
    );
  }
  return (
    service.value.durations.find((d) => d.isDefault) ||
    service.value.durations[0]
  );
});

onMounted(() => {
  if (currentPrice.value) {
    selectedDuration.value = currentPrice.value.minutes;
  }
});

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQuantity = () => {
  quantity.value++;
};

useHead({
  title: `${service.value.name} - Holistic Wellness`,
  meta: [{ name: "description", content: service.value.description }],
});
</script>

<template>
  <div class="relative min-h-screen overflow-hidden text-white">
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-brand-sand bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/95"
      ></div>
    </div>

    <div>
      <!-- Main Product Layout -->
      <div
        class="container mx-auto px-4 py-8 md:px-8 md:py-12 relative z-10 md:pt-20 pt-20"
      >
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <!-- Left: Image Gallery (40%) -->
          <div class="lg:col-span-2">
            <!-- Main Image -->
            <div class="mb-4 border border-stone-200">
              <NuxtImg
                :src="allImages[selectedImage]"
                :alt="service.name"
                class="w-full aspect-square object-cover"
              />
            </div>

            <!-- Thumbnails -->
            <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              <button
                v-for="(image, index) in allImages"
                :key="index"
                @click="selectedImage = index"
                :class="[
                  'flex-shrink-0 w-20 h-20 md:w-auto md:h-auto md:flex-1 border-2 transition-all',
                  selectedImage === index
                    ? 'border-stone-900'
                    : 'border-stone-200 hover:border-stone-400',
                ]"
              >
                <NuxtImg
                  :src="image"
                  :alt="`${service.name} view ${index + 1}`"
                  class="w-full aspect-square object-cover"
                />
              </button>
            </div>
          </div>

          <!-- Right: Service Details (60%) -->
          <div class="lg:col-span-3 relative z-10">
            <div
              class="bg-transparent border border-stone-200 p-6 md:p-8 lg:p-12"
            >
              <!-- Title & Price -->
              <div
                class="flex flex-col md:flex-row items-start justify-between mb-4"
              >
                <h1
                  class="font-headlines text-4xl md:text-5xl lg:text-7xl font-light leading-none mb-4 tracking-tight text-center md:text-left text-white uppercase"
                >
                  {{ service.name }}
                </h1>
                <span
                  class="text-3xl lg:text-4xl font-sans whitespace-nowrap ml-4 pt-3"
                >
                  ${{ currentPrice?.price }}
                </span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2 mb-8 pl-5 md:pl-0">
                <div class="flex gap-1">
                  <span v-for="i in 5" :key="i" class="text-white">★</span>
                </div>
                <a
                  href="#reviews"
                  class="text-sm text-white underline hover:text-stone-900"
                >
                  {{ service.reviewCount }} reviews
                </a>
              </div>

              <hr class="border-stone-200 mb-8" />

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <!-- Description -->
                <div>
                  <h2
                    class="text-xs tracking-[0.2em] uppercase font-medium mb-4 text-white/60"
                  >
                    Description
                  </h2>
                  <p class="text-white/90 text-base leading-relaxed">
                    {{ service.shortDescription }}
                  </p>
                </div>

                <!-- For -->
                <div>
                  <h2
                    class="text-xs tracking-[0.2em] uppercase font-medium mb-4 text-white/60"
                  >
                    For
                  </h2>
                  <ul class="space-y-2">
                    <li
                      v-for="(idealFor, index) in service.idealFor"
                      :key="index"
                      class="flex items-start gap-3"
                      @click="selectedDuration = index"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"
                      >
                      </span>
                      <span class="text-white/80 text-sm leading-relaxed">
                        {{ idealFor }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr class="border-stone-200 mb-8" />

              <!-- Duration Selector -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Duration
                </h3>
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="duration in service.durations"
                    :key="duration.minutes"
                    @click="selectedDuration = duration.minutes"
                    :class="[
                      'px-8 py-3 border-2 rounded-full transition-all text-sm tracking-wider font-medium',
                      selectedDuration === duration.minutes
                        ? 'bg-white text-stone-900 border-stone-900'
                        : 'bg-white text-stone-900 border-stone-300 hover:border-stone-900',
                    ]"
                  >
                    {{ duration.minutes }}
                  </button>
                </div>
              </div>

              <!-- Date Picker (Simplified) -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Select Date
                </h3>
                <input
                  v-model="selectedDate"
                  type="date"
                  class="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors text-black"
                />
              </div>

              <!-- Time Selector (Simplified) -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Select Time
                </h3>
                <select
                  v-model="selectedTime"
                  class="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors text-black"
                >
                  <option value="">Choose a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <!-- Added contact information fields -->
              <!-- Full Name -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Full Name
                </h3>
                <input
                  v-model="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors text-black placeholder:text-stone-400"
                />
              </div>

              <!-- Email Address -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Email Address
                </h3>
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors text-black placeholder:text-stone-400"
                />
              </div>

              <!-- Telephone -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Telephone
                </h3>
                <input
                  v-model="telephone"
                  type="tel"
                  placeholder="Enter your phone number"
                  class="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors text-black placeholder:text-stone-400"
                />
              </div>
              <!-- End of contact information fields -->

              <!-- Quantity -->
              <div class="mb-6">
                <h3
                  class="text-sm tracking-widest uppercase font-semibold mb-3"
                >
                  Quantity
                </h3>
                <input
                  v-model="quantity"
                  type="number"
                  min="1"
                  class="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors text-black"
                />
              </div>

              <hr class="border-stone-200 mb-8" />

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="reserveSession"
                  class="flex-1 bg-stone-900 text-white py-4 px-8 tracking-widest uppercase text-sm font-semibold hover:bg-stone-800 transition-colors"
                >
                  Reserve Session
                </button>
                <button
                  class="w-14 h-14 border-2 border-stone-300 hover:border-stone-900 transition-colors flex items-center justify-center"
                  aria-label="Add to favorites"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
