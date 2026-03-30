<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCountUp } from '@/composables/useCountUp'

const { t } = useI18n()

const { counterRef: yearsRef, displayValue: yearsValue } = useCountUp(19, 1800, '', '')
const { counterRef: sitesRef, displayValue: sitesValue } = useCountUp(150, 2000, '', '+')
const { counterRef: mwRef, displayValue: mwValue } = useCountUp(25, 2200, '', '')
const { counterRef: countriesRef, displayValue: countriesValue } = useCountUp(15, 1800, '', '+')
</script>

<template>
  <section class="relative min-h-[85vh] flex items-center overflow-hidden">
    <!-- Background image -->
    <div class="absolute inset-0">
      <img
        src="/images/esf/local-croix-rouge-philipines/dscn2091.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50"></div>
      <!-- Amber radial glow -->
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
    </div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
      <div class="max-w-3xl">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-8 border border-white/10">
          <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          {{ t('hero.badge') }}
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 text-white">
          {{ t('hero.title1') }}
          <span class="text-accent">{{ t('hero.title2') }}</span>
        </h1>

        <p class="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
          {{ t('hero.subtitle') }}
        </p>

        <!-- CTA -->
        <RouterLink
          to="/devis"
          class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-bold rounded-lg text-lg hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/25"
        >
          {{ t('hero.ctaPrimary') }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>

      <!-- Animated counters -->
      <div class="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
        <div ref="yearsRef" class="text-center md:text-left">
          <div class="text-3xl md:text-4xl font-extrabold text-white">{{ yearsValue }} <span class="text-xl text-accent">ans</span></div>
          <div class="text-sm text-gray-400 mt-1">{{ t('hero.counterYears') }}</div>
        </div>
        <div ref="sitesRef" class="text-center md:text-left">
          <div class="text-3xl md:text-4xl font-extrabold text-white">{{ sitesValue }}</div>
          <div class="text-sm text-gray-400 mt-1">{{ t('hero.counterSites') }}</div>
        </div>
        <div ref="mwRef" class="text-center md:text-left">
          <div class="text-3xl md:text-4xl font-extrabold text-white">{{ mwValue }} <span class="text-xl text-accent">MW</span></div>
          <div class="text-sm text-gray-400 mt-1">{{ t('hero.counterMW') }}</div>
        </div>
        <div ref="countriesRef" class="text-center md:text-left">
          <div class="text-3xl md:text-4xl font-extrabold text-white">{{ countriesValue }}</div>
          <div class="text-sm text-gray-400 mt-1">{{ t('hero.counterCountries') }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>
