<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()
const activeSection = ref('hero')

// Flatten nested object to dot-notation keys
function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, fullKey))
    } else {
      result[fullKey] = String(val ?? '')
    }
  }
  return result
}

// Set a value in a nested object using dot-notation key
function setNestedValue(obj: Record<string, unknown>, path: string, value: string) {
  const parts = path.split('.')
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]!
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }
  current[parts[parts.length - 1]!] = value
}

const sections = [
  { key: 'nav', label: 'Navigation' },
  { key: 'hero', label: 'Hero (bannière)' },
  { key: 'partners', label: 'Partenaires' },
  { key: 'decisions', label: 'Blocs décisionnels' },
  { key: 'diff', label: 'Différenciateurs' },
  { key: 'testimonials', label: 'Témoignages' },
  { key: 'trust', label: 'Confiance' },
  { key: 'blog', label: 'Blog' },
  { key: 'featured', label: 'Réalisations' },
  { key: 'map', label: 'Carte' },
  { key: 'cta', label: 'Appel à action' },
  { key: 'footerForm', label: 'Formulaire footer' },
  { key: 'footer', label: 'Pied de page' },
  { key: 'values', label: 'Valeurs' },
  { key: 'stats', label: 'Statistiques' },
  { key: 'projectsPage', label: 'Page Projets' },
  { key: 'aboutPage', label: 'Page À propos' },
  { key: 'quotePage', label: 'Page Devis' },
]

const frKeys = computed(() => {
  const section = store.i18nFr[activeSection.value]
  if (!section || typeof section !== 'object') return {}
  return flattenObject(section as Record<string, unknown>)
})

const enKeys = computed(() => {
  const section = store.i18nEn[activeSection.value]
  if (!section || typeof section !== 'object') return {}
  return flattenObject(section as Record<string, unknown>)
})

const allKeys = computed(() => {
  const keys = new Set([...Object.keys(frKeys.value), ...Object.keys(enKeys.value)])
  return [...keys].sort()
})

function updateFr(subKey: string, value: string) {
  const fullKey = `${activeSection.value}.${subKey}`
  setNestedValue(store.i18nFr as Record<string, unknown>, fullKey, value)
}

function updateEn(subKey: string, value: string) {
  const fullKey = `${activeSection.value}.${subKey}`
  setNestedValue(store.i18nEn as Record<string, unknown>, fullKey, value)
}

async function saveSection() {
  await Promise.all([store.saveI18nFr(), store.saveI18nEn()])
}
</script>

<template>
  <div class="max-w-6xl">
    <div class="flex gap-6">
      <!-- Section list -->
      <div class="w-52 flex-shrink-0">
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden sticky top-0">
          <button
            v-for="section in sections"
            :key="section.key"
            @click="activeSection = section.key"
            class="w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0"
            :class="activeSection === section.key
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-600 hover:bg-gray-50'"
          >
            {{ section.label }}
          </button>
        </div>
      </div>

      <!-- Editor -->
      <div class="flex-1 min-w-0">
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-900">
              {{ sections.find(s => s.key === activeSection)?.label }}
            </h2>
            <button
              @click="saveSection"
              class="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enregistrer
            </button>
          </div>

          <!-- Labels -->
          <div class="grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <div>Clé</div>
            <div>Français</div>
            <div>English</div>
          </div>

          <!-- Rows -->
          <div
            v-for="key in allKeys"
            :key="key"
            class="grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-gray-50 last:border-0 items-start"
          >
            <div class="text-xs font-mono text-gray-400 pt-2 break-all">{{ key }}</div>
            <div>
              <textarea
                :value="frKeys[key] || ''"
                @input="updateFr(key, ($event.target as HTMLTextAreaElement).value)"
                rows="2"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
            <div>
              <textarea
                :value="enKeys[key] || ''"
                @input="updateEn(key, ($event.target as HTMLTextAreaElement).value)"
                rows="2"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                :class="!enKeys[key] && frKeys[key] ? 'border-amber-300 bg-amber-50/50' : ''"
                :placeholder="!enKeys[key] && frKeys[key] ? 'Traduction manquante' : ''"
              ></textarea>
            </div>
          </div>

          <div v-if="allKeys.length === 0" class="p-8 text-center text-gray-400 text-sm">
            Aucune clé dans cette section.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
