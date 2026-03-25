<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { founders } from '@/data/founders'

const { t } = useI18n()
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-dark text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">{{ t('aboutPage.title') }}</h1>
        <p class="text-lg text-gray-300 max-w-2xl">
          {{ t('aboutPage.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Histoire -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">{{ t('aboutPage.historyTitle') }}</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p v-html="t('aboutPage.history1', { company: '<strong class=\'text-dark\'>Cap Énergie (CAPENERGIE)</strong>' })"></p>
            <p>{{ t('aboutPage.history2') }}</p>
            <p>{{ t('aboutPage.history3') }}</p>
            <p>{{ t('aboutPage.history4') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fondateurs -->
    <section class="py-20 bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">{{ t('aboutPage.foundersTitle') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="founder in founders"
            :key="founder.name"
            class="bg-white rounded-xl p-6 text-center shadow-sm"
          >
            <div class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-primary">
                {{ founder.name.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>
            <h3 class="font-semibold text-lg">{{ founder.name }}</h3>
            <p class="text-sm text-primary font-medium mt-1">{{ founder.role }}</p>
            <p class="text-sm text-gray mt-3">{{ founder.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Zones d'intervention -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">{{ t('aboutPage.zonesTitle') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127757;</div>
            <h3 class="font-semibold">{{ t('aboutPage.africa') }}</h3>
            <p class="text-sm text-gray mt-1">{{ t('aboutPage.africaCountries') }}</p>
          </div>
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127759;</div>
            <h3 class="font-semibold">{{ t('aboutPage.asia') }}</h3>
            <p class="text-sm text-gray mt-1">{{ t('aboutPage.asiaCountries') }}</p>
          </div>
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127758;</div>
            <h3 class="font-semibold">{{ t('aboutPage.caribbean') }}</h3>
            <p class="text-sm text-gray mt-1">{{ t('aboutPage.caribbeanCountries') }}</p>
          </div>
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127467;&#127479;</div>
            <h3 class="font-semibold">{{ t('aboutPage.domtom') }}</h3>
            <p class="text-sm text-gray mt-1">{{ t('aboutPage.domtomCountries') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-primary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('aboutPage.ctaTitle') }}</h2>
        <p class="text-lg text-white/80 mb-8">
          {{ t('aboutPage.ctaSubtitle') }}
        </p>
        <RouterLink
          to="/devis"
          class="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg text-lg hover:bg-gray-100 transition-colors"
        >
          {{ t('aboutPage.ctaButton') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>
