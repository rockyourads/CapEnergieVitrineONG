<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type {
  HeroCounter,
  BlogArticle,
  TrustBadge,
  DecisionBlock,
  Differentiator,
} from '@/types/data'

const store = useAdminStore()
const activeSection = ref('site')

const sections = [
  { key: 'site', label: 'Parametres du site' },
  { key: 'counters', label: 'Compteurs hero' },
  { key: 'blog', label: 'Articles blog' },
  { key: 'trust', label: 'Badges de confiance' },
  { key: 'decisions', label: 'Blocs decisionnels' },
  { key: 'differentiators', label: 'Differenciateurs' },
]

// ── Site settings ──

const settings = computed(() => store.siteSettings)

async function saveSiteSettings() {
  await store.saveSiteSettings()
}

// ── Hero counters ──

function addCounter() {
  store.heroCounters.push({
    value: 0,
    duration: 2000,
    prefix: '',
    suffix: '',
    labelKey: '',
    unitKey: '',
  })
}

function removeCounter(index: number) {
  if (!confirm('Supprimer ce compteur ?')) return
  store.heroCounters.splice(index, 1)
}

async function saveCounters() {
  await store.saveHeroCounters()
}

// ── Blog articles ──

function addBlogArticle() {
  store.blogArticles.push({ key: '', tag: '', color: '#3f8685' })
}

function removeBlogArticle(index: number) {
  const a = store.blogArticles[index]
  if (!a || !confirm(`Supprimer l'article "${a.key}" ?`)) return
  store.blogArticles.splice(index, 1)
}

async function saveBlogArticles() {
  await store.saveBlogArticles()
}

// ── Trust badges ──

function addTrustBadge() {
  store.trustBadges.push({ key: '', label: '' })
}

function removeTrustBadge(index: number) {
  const b = store.trustBadges[index]
  if (!b || !confirm(`Supprimer le badge "${b.key}" ?`)) return
  store.trustBadges.splice(index, 1)
}

async function saveTrustBadges() {
  await store.saveTrustBadges()
}

// ── Decision blocks ──

function addDecisionBlock() {
  store.decisionBlocks.push({ key: '', icon: '' })
}

function removeDecisionBlock(index: number) {
  const d = store.decisionBlocks[index]
  if (!d || !confirm(`Supprimer le bloc "${d.key}" ?`)) return
  store.decisionBlocks.splice(index, 1)
}

async function saveDecisionBlocks() {
  await store.saveDecisionBlocks()
}

// ── Differentiators ──

function addDifferentiator() {
  store.differentiators.push({ key: '', icon: '' })
}

function removeDifferentiator(index: number) {
  const d = store.differentiators[index]
  if (!d || !confirm(`Supprimer le differenciateur "${d.key}" ?`)) return
  store.differentiators.splice(index, 1)
}

async function saveDifferentiators() {
  await store.saveDifferentiators()
}
</script>

<template>
  <div class="max-w-6xl">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Section navigation -->
      <div class="w-full md:w-52 flex-shrink-0">
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden md:sticky md:top-0">
          <div class="flex md:flex-col overflow-x-auto md:overflow-x-visible">
            <button
              v-for="section in sections"
              :key="section.key"
              @click="activeSection = section.key"
              class="flex-shrink-0 md:w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0"
              :class="activeSection === section.key
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'"
            >
              {{ section.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Content area -->
      <div class="flex-1 min-w-0">

        <!-- ========== SITE SETTINGS ========== -->
        <div v-if="activeSection === 'site'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-base font-semibold text-gray-900">Parametres du site</h2>
              <button
                @click="saveSiteSettings"
                :disabled="store.saving"
                class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {{ store.saving ? 'Sauvegarde...' : 'Enregistrer' }}
              </button>
            </div>

            <div v-if="settings" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input
                    v-model="settings.companyName"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                  <input
                    v-model="settings.phone"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Siege</label>
                  <input
                    v-model="settings.headquarters"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Annee de fondation</label>
                  <input
                    v-model.number="settings.founded"
                    type="number"
                    min="1900"
                    max="2100"
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                <input
                  v-model="settings.youtube"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image hero</label>
                <input
                  v-model="settings.heroImage"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/images/hero.jpg"
                />
                <div v-if="settings.heroImage" class="mt-2 h-32 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    :src="settings.heroImage"
                    alt="Hero preview"
                    class="w-full h-full object-cover"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                </div>
              </div>
            </div>

            <div v-else class="py-8 text-center text-gray-400 text-sm">
              Chargement des parametres...
            </div>
          </div>
        </div>

        <!-- ========== HERO COUNTERS ========== -->
        <div v-if="activeSection === 'counters'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 class="text-base font-semibold text-gray-900">Compteurs hero</h2>
              <div class="flex items-center gap-3">
                <button
                  @click="addCounter"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter
                </button>
                <button
                  @click="saveCounters"
                  :disabled="store.saving"
                  class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Enregistrer
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Valeur</th>
                    <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Prefixe</th>
                    <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Suffixe</th>
                    <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Cle label</th>
                    <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Cle unite</th>
                    <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Duree (ms)</th>
                    <th class="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(counter, index) in store.heroCounters"
                    :key="index"
                    class="border-b border-gray-50 last:border-0"
                  >
                    <td class="px-5 py-2">
                      <input
                        v-model.number="counter.value"
                        type="number"
                        class="w-20 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td class="px-5 py-2">
                      <input
                        v-model="counter.prefix"
                        type="text"
                        class="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+"
                      />
                    </td>
                    <td class="px-5 py-2">
                      <input
                        v-model="counter.suffix"
                        type="text"
                        class="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="%"
                      />
                    </td>
                    <td class="px-5 py-2">
                      <input
                        v-model="counter.labelKey"
                        type="text"
                        class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="hero.counterLabel"
                      />
                    </td>
                    <td class="px-5 py-2">
                      <input
                        v-model="counter.unitKey"
                        type="text"
                        class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="hero.counterUnit"
                      />
                    </td>
                    <td class="px-5 py-2">
                      <input
                        v-model.number="counter.duration"
                        type="number"
                        step="100"
                        class="w-24 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td class="px-5 py-2 text-right">
                      <button
                        @click="removeCounter(index)"
                        class="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                        title="Supprimer"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="!store.heroCounters.length" class="p-8 text-center text-gray-400 text-sm">
              Aucun compteur configure.
            </div>
          </div>
        </div>

        <!-- ========== BLOG ARTICLES ========== -->
        <div v-if="activeSection === 'blog'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 class="text-base font-semibold text-gray-900">Articles blog</h2>
              <div class="flex items-center gap-3">
                <button
                  @click="addBlogArticle"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter
                </button>
                <button
                  @click="saveBlogArticles"
                  :disabled="store.saving"
                  class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Enregistrer
                </button>
              </div>
            </div>

            <!-- Info hint -->
            <div class="mx-6 mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p class="text-xs text-amber-700">
                Les titres et descriptions des articles sont geres dans la section
                <strong>Contenu &gt; Blog</strong> (fichiers i18n). Ici vous configurez les cles et les tags.
              </p>
            </div>

            <div class="p-6 space-y-3">
              <div
                v-for="(article, index) in store.blogArticles"
                :key="index"
                class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg"
              >
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Cle i18n</label>
                    <input
                      v-model="article.key"
                      type="text"
                      placeholder="article1"
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Tag</label>
                    <input
                      v-model="article.tag"
                      type="text"
                      placeholder="Energie solaire"
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Couleur</label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model="article.color"
                        type="color"
                        class="w-8 h-8 border border-gray-200 rounded cursor-pointer"
                      />
                      <input
                        v-model="article.color"
                        type="text"
                        class="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                        placeholder="#3f8685"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="removeBlogArticle(index)"
                  class="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="!store.blogArticles.length" class="p-8 text-center text-gray-400 text-sm">
              Aucun article configure.
            </div>
          </div>
        </div>

        <!-- ========== TRUST BADGES ========== -->
        <div v-if="activeSection === 'trust'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 class="text-base font-semibold text-gray-900">Badges de confiance</h2>
              <div class="flex items-center gap-3">
                <button
                  @click="addTrustBadge"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter
                </button>
                <button
                  @click="saveTrustBadges"
                  :disabled="store.saving"
                  class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Enregistrer
                </button>
              </div>
            </div>

            <div class="p-6 space-y-3">
              <div
                v-for="(badge, index) in store.trustBadges"
                :key="index"
                class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg"
              >
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Cle i18n</label>
                    <input
                      v-model="badge.key"
                      type="text"
                      placeholder="badge1"
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Label</label>
                    <input
                      v-model="badge.label"
                      type="text"
                      placeholder="Certifie ISO 9001"
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  @click="removeTrustBadge(index)"
                  class="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="!store.trustBadges.length" class="p-8 text-center text-gray-400 text-sm">
              Aucun badge configure.
            </div>
          </div>
        </div>

        <!-- ========== DECISION BLOCKS ========== -->
        <div v-if="activeSection === 'decisions'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 class="text-base font-semibold text-gray-900">Blocs decisionnels</h2>
              <div class="flex items-center gap-3">
                <button
                  @click="addDecisionBlock"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter
                </button>
                <button
                  @click="saveDecisionBlocks"
                  :disabled="store.saving"
                  class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Enregistrer
                </button>
              </div>
            </div>

            <div class="p-6 space-y-3">
              <div
                v-for="(block, index) in store.decisionBlocks"
                :key="index"
                class="flex items-center gap-4 p-3 border border-gray-100 rounded-lg"
              >
                <!-- Icon preview -->
                <div class="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    v-if="block.icon"
                    :src="block.icon"
                    :alt="block.key"
                    class="w-6 h-6 object-contain"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                  <svg v-else class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Cle i18n</label>
                    <input
                      v-model="block.key"
                      type="text"
                      placeholder="block1"
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Chemin icone</label>
                    <input
                      v-model="block.icon"
                      type="text"
                      placeholder="/images/icons/..."
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  @click="removeDecisionBlock(index)"
                  class="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="!store.decisionBlocks.length" class="p-8 text-center text-gray-400 text-sm">
              Aucun bloc configure.
            </div>
          </div>
        </div>

        <!-- ========== DIFFERENTIATORS ========== -->
        <div v-if="activeSection === 'differentiators'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 class="text-base font-semibold text-gray-900">Differenciateurs</h2>
              <div class="flex items-center gap-3">
                <button
                  @click="addDifferentiator"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter
                </button>
                <button
                  @click="saveDifferentiators"
                  :disabled="store.saving"
                  class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Enregistrer
                </button>
              </div>
            </div>

            <div class="p-6 space-y-3">
              <div
                v-for="(diff, index) in store.differentiators"
                :key="index"
                class="flex items-center gap-4 p-3 border border-gray-100 rounded-lg"
              >
                <!-- Icon preview -->
                <div class="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    v-if="diff.icon"
                    :src="diff.icon"
                    :alt="diff.key"
                    class="w-6 h-6 object-contain"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                  <svg v-else class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Cle i18n</label>
                    <input
                      v-model="diff.key"
                      type="text"
                      placeholder="diff1"
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Chemin icone</label>
                    <input
                      v-model="diff.icon"
                      type="text"
                      placeholder="/images/icons/..."
                      class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  @click="removeDifferentiator(index)"
                  class="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="!store.differentiators.length" class="p-8 text-center text-gray-400 text-sm">
              Aucun differenciateur configure.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
