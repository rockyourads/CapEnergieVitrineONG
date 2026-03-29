<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const { elementRef, isVisible } = useScrollReveal()

const blocks = [
  {
    key: 'hospitals',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />`,
  },
  {
    key: 'villages',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />`,
  },
  {
    key: 'logistics',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />`,
  },
]
</script>

<template>
  <section class="py-24 bg-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('decisions.title') }}</h2>
        <p class="text-gray max-w-2xl mx-auto text-lg">{{ t('decisions.subtitle') }}</p>
      </div>

      <div
        ref="elementRef"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <RouterLink
          v-for="(block, index) in blocks"
          :key="block.key"
          to="/projets"
          class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 reveal"
          :class="[isVisible && 'is-visible', `stagger-${index + 1}`]"
        >
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="block.icon"></svg>
          </div>
          <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
            {{ t(`decisions.${block.key}.title`) }}
          </h3>
          <p class="text-gray leading-relaxed mb-4">
            {{ t(`decisions.${block.key}.desc`) }}
          </p>
          <span class="inline-flex items-center gap-1 text-primary font-medium text-sm">
            {{ t('decisions.seeProjects') }}
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
