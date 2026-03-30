<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const partners = [
  { name: 'Croix-Rouge', logo: '/images/partners/croix-rouge.svg' },
  { name: 'Électriciens Sans Frontières', logo: '/images/partners/esf.jpg' },
  { name: 'MSF', logo: '/images/partners/msf.svg' },
  { name: 'Chrétien-Orient', logo: '/images/partners/oeuvre-orient.svg' },
  { name: 'ADEME', logo: '/images/partners/ademe.svg' },
]
</script>

<template>
  <section class="py-6 bg-white border-y border-gray-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-xs text-center text-gray uppercase tracking-widest mb-4">
        {{ t('partners.title') }}
      </p>
    </div>
    <div class="relative">
      <!-- Fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      <!-- Marquee -->
      <div class="flex animate-marquee whitespace-nowrap">
        <div v-for="n in 2" :key="n" class="flex items-center gap-16 px-8">
          <div
            v-for="partner in partners"
            :key="partner.name + n"
            class="flex flex-col items-center gap-2 min-w-[120px]"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-8 w-auto object-contain opacity-60 grayscale"
            />
            <span class="text-[10px] font-medium text-gray/40 tracking-wide uppercase whitespace-nowrap">
              {{ partner.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
