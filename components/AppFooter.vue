<script setup>
import { Icon } from "@iconify/vue";
defineProps(["block"]);
</script>

<template>
  <footer class="py-16 md:py-24 bg-surface-emphasis rounded-t-2xl">
    <div class="section-content">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 class="text-nav-brand text-brand-terracotta mb-6">
            Raíces Centro Holístico
          </h3>

          <p
            v-if="block.socialProof"
            class="text-body-sm text-content-subtle leading-relaxed"
          >
            {{ block.socialProof }}
          </p>
          <div v-if="block.socialLinks" class="flex gap-4 mt-6">
            <a
              v-if="block.socialLinks.instagram"
              :href="block.socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="text-content-subtle hover:text-content transition-colors"
            >
              <Icon icon="mdi:instagram" class="w-6 h-6" />
            </a>
            <a
              v-if="block.socialLinks.facebook"
              :href="block.socialLinks.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="text-content-subtle hover:text-content transition-colors"
            >
              <Icon icon="mdi:facebook" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-nav-link text-brand-terracotta mb-6 font-sans">
            Navegación
          </h4>
          <nav v-if="block.secondaryNavigation" class="flex flex-col gap-3">
            <NuxtLink
              v-for="item in block.secondaryNavigation"
              :key="item._key"
              :to="item.url"
              class="text-body-sm text-content-subtle hover:text-content transition-colors"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>

        <div>
          <h4 class="text-nav-link text-brand-terracotta mb-6 font-sans">
            Contacto
          </h4>
          <div v-if="block.contact" class="flex flex-col gap-3">
            <a
              v-if="block.contact.phone"
              :href="`tel:${block.contact.phone}`"
              class="text-body-sm text-content-subtle hover:text-content transition-colors"
            >
              {{ block.contact.phone }}
            </a>
            <a
              v-if="block.contact.whatsapp"
              :href="`https://wa.me/${block.contact.whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-sm text-content-subtle hover:text-content transition-colors"
            >
              WhatsApp
            </a>
            <a
              v-if="block.contact.email"
              :href="`mailto:${block.contact.email}`"
              class="text-body-sm text-content-subtle hover:text-content transition-colors"
            >
              {{ block.contact.email }}
            </a>
          </div>

          <div v-if="block.schedule" class="mt-6">
            <h5 class="text-nav-link text-brand-terracotta mb-3 font-sans">
              Horarios
            </h5>
            <div class="flex flex-col gap-1">
              <p
                v-for="day in block.schedule"
                :key="day._key"
                class="text-body-xs text-content-subtle"
              >
                {{ day.label }}: {{ day.hours }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-nav-link text-brand-terracotta mb-6 font-sans">
            Ubicación
          </h4>
          <div v-if="block.location">
            <p class="text-body-sm text-content-subtle mb-3">
              {{ block.location.address }}
            </p>
            <a
              v-if="block.location.googleMapsUrl"
              :href="block.location.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-sm text-accent hover:text-accent/80 transition-colors"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </div>

      <hr class="border-surface/10 mb-8" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p
          class="text-body-xs text-brand-terracotta text-content-subtle text-center"
        >
          © {{ new Date().getFullYear() }} Raíces Centro Holístico. Todos los
          derechos reservados.
        </p>
        <div v-if="block.legalDocuments" class="flex gap-6">
          <a
            v-if="block.legalDocuments.privacyPolicy?.asset?.url"
            :href="block.legalDocuments.privacyPolicy.asset.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-body-xs text-brand-terracotta hover:text-brand-terracotta/80 text-content-subtle transition-colors"
          >
            Aviso de Privacidad
          </a>
          <a
            v-if="block.legalDocuments.terms?.asset?.url"
            :href="block.legalDocuments.terms.asset.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-body-xs text-brand-terracotta hover:text-brand-terracotta/80 text-content-subtle transition-colors"
          >
            Términos y Condiciones
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
