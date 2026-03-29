<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const { elementRef, isVisible } = useScrollReveal()

const badges = [
  { key: 'ademe', label: 'Club ADEME International' },
  { key: 'qualipv', label: 'QualiPV' },
  { key: 'iso', label: 'ISO 9001' },
  { key: 'ce', label: 'Normes CE' },
]
</script>

<template>
  <section class="py-24 bg-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('trust.title') }}</h2>
        <p class="text-gray max-w-2xl mx-auto text-lg">{{ t('trust.subtitle') }}</p>
      </div>

      <div
        ref="elementRef"
        class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
      >
        <div
          v-for="(badge, index) in badges"
          :key="badge.key"
          class="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm reveal"
          :class="[isVisible && 'is-visible', `stagger-${index + 1}`]"
        >
          <div class="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div class="font-semibold text-sm">{{ badge.label }}</div>
          <div class="text-xs text-gray mt-1">{{ t(`trust.${badge.key}Desc`) }}</div>
        </div>
      </div>

      <!-- PDF Download -->
      <div class="text-center">
        <a
          href="#"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-dark hover:border-primary hover:text-primary transition-colors shadow-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {{ t('trust.downloadPDF') }}
        </a>
      </div>
    </div>
  </section>
</template>
