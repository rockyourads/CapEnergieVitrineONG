<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const { elementRef, isVisible } = useScrollReveal()

const articles = [
  { key: 'sizing', tag: 'guide', color: 'bg-primary' },
  { key: 'maintenance', tag: 'technique', color: 'bg-accent' },
  { key: 'batteries', tag: 'comparatif', color: 'bg-green-600' },
]
</script>

<template>
  <section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('blog.title') }}</h2>
        <p class="text-gray max-w-2xl mx-auto text-lg">{{ t('blog.subtitle') }}</p>
      </div>

      <div
        ref="elementRef"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <a
          v-for="(article, index) in articles"
          :key="article.key"
          href="#"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 reveal"
          :class="[isVisible && 'is-visible', `stagger-${index + 1}`]"
        >
          <!-- Placeholder image -->
          <div class="h-48 bg-gradient-to-br from-dark/5 to-primary/10 flex items-center justify-center">
            <svg class="w-12 h-12 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div class="p-6">
            <span :class="[article.color]" class="inline-block px-3 py-1 text-white text-xs font-medium rounded-full mb-3">
              {{ t(`blog.${article.key}.tag`) }}
            </span>
            <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {{ t(`blog.${article.key}.title`) }}
            </h3>
            <p class="text-gray text-sm leading-relaxed">
              {{ t(`blog.${article.key}.excerpt`) }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
