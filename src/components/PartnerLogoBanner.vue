<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const partners = [
  'Croix-Rouge',
  'Électriciens Sans Frontières',
  'MSF',
  'LASER',
  'Chrétien-Orient',
  'ADEME',
]
</script>

<template>
  <section class="py-8 bg-white border-y border-gray-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-xs text-center text-gray uppercase tracking-widest mb-6">
        {{ t('partners.title') }}
      </p>
    </div>
    <div class="relative">
      <!-- Fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      <!-- Marquee -->
      <div class="flex animate-marquee whitespace-nowrap">
        <div v-for="n in 2" :key="n" class="flex items-center gap-12 px-6">
          <span
            v-for="partner in partners"
            :key="partner + n"
            class="text-lg md:text-xl font-semibold text-gray/40 tracking-wide uppercase"
          >
            {{ partner }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
