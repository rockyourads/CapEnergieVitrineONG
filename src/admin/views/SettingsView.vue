<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <!-- Site settings -->
    <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-gray-900">Informations de l'entreprise</h2>
        <button
          @click="store.saveSiteSettings()"
          class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enregistrer
        </button>
      </div>

      <div v-if="store.siteSettings" class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
          <input v-model="store.siteSettings.companyName" type="text" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input v-model="store.siteSettings.phone" type="text" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Siège social</label>
          <input v-model="store.siteSettings.headquarters" type="text" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Année de création</label>
          <input v-model.number="store.siteSettings.founded" type="number" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
          <input v-model="store.siteSettings.youtube" type="url" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Image Hero (chemin)</label>
          <input v-model="store.siteSettings.heroImage" type="text" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>

    <!-- Hero counters -->
    <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-gray-900">Compteurs du hero</h2>
        <button
          @click="store.saveHeroCounters()"
          class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enregistrer
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="(counter, index) in store.heroCounters"
          :key="index"
          class="grid grid-cols-5 gap-3 items-end"
        >
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Valeur</label>
            <input v-model.number="counter.value" type="number" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Suffixe</label>
            <input v-model="counter.suffix" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Unité</label>
            <input v-model="counter.unitKey" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MW, ans..." />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Clé i18n label</label>
            <input v-model="counter.labelKey" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Durée (ms)</label>
            <input v-model.number="counter.duration" type="number" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Blog articles -->
    <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-gray-900">Articles de blog</h2>
        <button
          @click="store.saveBlogArticles()"
          class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enregistrer
        </button>
      </div>
      <p class="text-xs text-gray-500">Les textes se modifient dans l'éditeur de Contenu (section Blog).</p>

      <div class="space-y-3">
        <div
          v-for="(article, index) in store.blogArticles"
          :key="index"
          class="grid grid-cols-3 gap-3"
        >
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Clé</label>
            <input v-model="article.key" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Tag</label>
            <input v-model="article.tag" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Couleur CSS</label>
            <input v-model="article.color" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Trust badges -->
    <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-gray-900">Certifications & confiance</h2>
        <button
          @click="store.saveTrustBadges()"
          class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enregistrer
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="(badge, index) in store.trustBadges"
          :key="index"
          class="grid grid-cols-2 gap-3"
        >
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Clé</label>
            <input v-model="badge.key" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label v-if="index === 0" class="block text-xs font-medium text-gray-500 mb-1">Label</label>
            <input v-model="badge.label" type="text" class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
