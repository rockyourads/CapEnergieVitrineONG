<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const { elementRef, isVisible } = useScrollReveal()

const testimonials = [
  { key: 'esf', initials: 'ESF', org: 'Électriciens Sans Frontières' },
  { key: 'croixrouge', initials: 'CR', org: 'Croix-Rouge' },
  { key: 'msf', initials: 'MSF', org: 'Médecins Sans Frontières' },
]
</script>

<template>
  <section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('testimonials.title') }}</h2>
        <p class="text-gray max-w-2xl mx-auto text-lg">{{ t('testimonials.subtitle') }}</p>
      </div>

      <div
        ref="elementRef"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div
          v-for="(item, index) in testimonials"
          :key="item.key"
          class="bg-light rounded-2xl p-8 reveal"
          :class="[isVisible && 'is-visible', `stagger-${index + 1}`]"
        >
          <!-- Quote icon -->
          <svg class="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
          </svg>

          <p class="text-dark/80 leading-relaxed mb-6 italic">
            "{{ t(`testimonials.${item.key}.quote`) }}"
          </p>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-200">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
              {{ item.initials }}
            </div>
            <div>
              <div class="font-semibold text-sm">{{ t(`testimonials.${item.key}.author`) }}</div>
              <div class="text-gray text-xs">{{ item.org }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
