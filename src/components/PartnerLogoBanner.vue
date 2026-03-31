<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

const partners = [
  { name: 'Croix-Rouge', logo: `${base}/images/partners/croix-rouge.svg` },
  { name: 'Électriciens Sans Frontières', logo: `${base}/images/partners/esf.jpg` },
  { name: 'MSF', logo: `${base}/images/partners/msf.svg` },
  { name: 'Chrétien-Orient', logo: `${base}/images/partners/oeuvre-orient.svg` },
  { name: 'ADEME', logo: `${base}/images/partners/ademe.svg` },
]
</script>

<template>
  <section class="py-8 bg-white border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-xs text-center text-gray uppercase tracking-widest mb-6">
        {{ t('partners.title') }}
      </p>
      <div class="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
        <div
          v-for="partner in partners"
          :key="partner.name"
          class="flex flex-col items-center gap-3"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-12 md:h-14 w-auto object-contain"
          />
          <span class="text-xs font-medium text-gray/50 tracking-wide uppercase">
            {{ partner.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
