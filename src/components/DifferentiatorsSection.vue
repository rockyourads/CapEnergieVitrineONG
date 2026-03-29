<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCountUp } from '@/composables/useCountUp'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const { elementRef, isVisible } = useScrollReveal()

const { counterRef: yearsRef, displayValue: yearsValue } = useCountUp(18, 2000, '', '')
const { counterRef: caRef, displayValue: caValue } = useCountUp(6, 1800, '', '')
const { counterRef: projectsRef, displayValue: projectsValue } = useCountUp(150, 2200, '', '+')

const differentiators = [
  {
    key: 'pioneer',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />`,
  },
  {
    key: 'fullchain',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />`,
  },
  {
    key: 'award',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />`,
  },
]
</script>

<template>
  <section class="py-24 bg-dark text-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('diff.title') }}</h2>
        <p class="text-gray-400 max-w-2xl mx-auto text-lg">{{ t('diff.subtitle') }}</p>
      </div>

      <!-- Animated stats -->
      <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
        <div ref="yearsRef" class="text-center">
          <div class="text-4xl md:text-5xl font-extrabold text-accent">{{ yearsValue }}</div>
          <div class="text-sm text-gray-400 mt-2">{{ t('diff.statYears') }}</div>
        </div>
        <div ref="caRef" class="text-center">
          <div class="text-4xl md:text-5xl font-extrabold text-accent">{{ caValue }}<span class="text-2xl">M€</span></div>
          <div class="text-sm text-gray-400 mt-2">{{ t('diff.statCA') }}</div>
        </div>
        <div ref="projectsRef" class="text-center">
          <div class="text-4xl md:text-5xl font-extrabold text-accent">{{ projectsValue }}</div>
          <div class="text-sm text-gray-400 mt-2">{{ t('diff.statProjects') }}</div>
        </div>
      </div>

      <!-- Differentiator cards -->
      <div
        ref="elementRef"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div
          v-for="(item, index) in differentiators"
          :key="item.key"
          class="bg-dark-soft rounded-2xl p-8 border border-white/5 reveal"
          :class="[isVisible && 'is-visible', `stagger-${index + 1}`]"
        >
          <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="item.icon"></svg>
          </div>
          <h3 class="text-lg font-bold mb-2">{{ t(`diff.${item.key}.title`) }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">{{ t(`diff.${item.key}.desc`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
