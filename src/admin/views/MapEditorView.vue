<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { MapPoint } from '@/types/data'

const store = useAdminStore()

const editingIndex = ref<number | null>(null)
const showAddForm = ref(false)

const newPoint = ref<MapPoint>({
  country: '',
  countryEn: '',
  svgX: 0,
  svgY: 0,
  organizations: [],
})
const newOrgsInput = ref('')

const points = computed(() => store.mapData?.points ?? [])

function toggleEdit(index: number) {
  editingIndex.value = editingIndex.value === index ? null : index
}

function getOrgsString(orgs: string[]): string {
  return orgs.join(', ')
}

function setOrgs(point: MapPoint, value: string) {
  point.organizations = value.split(',').map(s => s.trim()).filter(Boolean)
}

function addPoint() {
  if (!newPoint.value.country.trim() || !newPoint.value.countryEn.trim()) {
    store.showToast('Le nom du pays (FR et EN) est requis', 'error')
    return
  }
  if (!store.mapData) {
    store.showToast('Donnees de carte non chargees', 'error')
    return
  }
  const orgs = newOrgsInput.value.split(',').map(s => s.trim()).filter(Boolean)
  store.mapData.points.push({
    ...newPoint.value,
    organizations: orgs,
  })
  newPoint.value = { country: '', countryEn: '', svgX: 0, svgY: 0, organizations: [] }
  newOrgsInput.value = ''
  showAddForm.value = false
}

function removePoint(index: number) {
  if (!store.mapData) return
  const point = store.mapData.points[index]
  if (!point || !confirm(`Supprimer le point "${point.country}" ?`)) return
  store.mapData.points.splice(index, 1)
  if (editingIndex.value === index) editingIndex.value = null
}

async function save() {
  await store.saveMapData()
}
</script>

<template>
  <div class="max-w-5xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Carte des interventions</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ points.length }} point{{ points.length > 1 ? 's' : '' }} sur la carte</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="showAddForm = !showAddForm"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un point
        </button>
        <button
          @click="save"
          :disabled="store.saving"
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ store.saving ? 'Sauvegarde...' : 'Enregistrer' }}
        </button>
      </div>
    </div>

    <!-- ViewBox settings -->
    <div v-if="store.mapData" class="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h2 class="text-sm font-semibold text-gray-700 mb-3">ViewBox SVG</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">minX</label>
          <input
            v-model.number="store.mapData.viewBox.minX"
            type="number"
            class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">minY</label>
          <input
            v-model.number="store.mapData.viewBox.minY"
            type="number"
            class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">width</label>
          <input
            v-model.number="store.mapData.viewBox.width"
            type="number"
            class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">height</label>
          <input
            v-model.number="store.mapData.viewBox.height"
            type="number"
            class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Add form -->
    <div v-if="showAddForm" class="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
      <h2 class="text-sm font-semibold text-gray-700">Nouveau point</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Pays (FR) *</label>
          <input
            v-model="newPoint.country"
            type="text"
            placeholder="Ex: Philippines"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Pays (EN) *</label>
          <input
            v-model="newPoint.countryEn"
            type="text"
            placeholder="Ex: Philippines"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Position SVG X</label>
          <input
            v-model.number="newPoint.svgX"
            type="number"
            step="0.1"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Position SVG Y</label>
          <input
            v-model.number="newPoint.svgY"
            type="number"
            step="0.1"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Organisations (separees par des virgules)</label>
        <input
          v-model="newOrgsInput"
          type="text"
          placeholder="Ex: Croix Rouge, ESF, UNICEF"
          class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          @click="showAddForm = false"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="addPoint"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter le point
        </button>
      </div>
    </div>

    <!-- Points table -->
    <div v-if="points.length" class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Pays</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Pays (EN)</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">SVG X</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">SVG Y</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Organisations</th>
              <th class="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(point, index) in points" :key="index">
              <!-- Summary row -->
              <tr
                class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                @click="toggleEdit(index)"
              >
                <td class="px-5 py-3">
                  <span class="text-sm font-medium text-gray-900">{{ point.country }}</span>
                </td>
                <td class="px-5 py-3">
                  <span class="text-sm text-gray-600">{{ point.countryEn }}</span>
                </td>
                <td class="px-5 py-3">
                  <span class="text-sm text-gray-600 font-mono">{{ point.svgX }}</span>
                </td>
                <td class="px-5 py-3">
                  <span class="text-sm text-gray-600 font-mono">{{ point.svgY }}</span>
                </td>
                <td class="px-5 py-3">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="org in point.organizations"
                      :key="org"
                      class="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                    >
                      {{ org }}
                    </span>
                    <span v-if="!point.organizations.length" class="text-xs text-gray-400">--</span>
                  </div>
                </td>
                <td class="px-5 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      @click.stop="toggleEdit(index)"
                      class="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
                      title="Modifier"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click.stop="removePoint(index)"
                      class="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                      title="Supprimer"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Inline edit row -->
              <tr v-if="editingIndex === index" class="bg-blue-50/30 border-b border-gray-100">
                <td colspan="6" class="px-5 py-4">
                  <div class="space-y-3">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label class="block text-xs font-medium text-gray-500 mb-1">Pays (FR)</label>
                        <input
                          v-model="point.country"
                          type="text"
                          class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-500 mb-1">Pays (EN)</label>
                        <input
                          v-model="point.countryEn"
                          type="text"
                          class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-500 mb-1">SVG X</label>
                        <input
                          v-model.number="point.svgX"
                          type="number"
                          step="0.1"
                          class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-500 mb-1">SVG Y</label>
                        <input
                          v-model.number="point.svgY"
                          type="number"
                          step="0.1"
                          class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-500 mb-1">Organisations (separees par des virgules)</label>
                      <input
                        :value="getOrgsString(point.organizations)"
                        @input="setOrgs(point, ($event.target as HTMLInputElement).value)"
                        type="text"
                        class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>
                    <div class="flex justify-end">
                      <button
                        @click="editingIndex = null"
                        class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-sm text-gray-400">Aucun point sur la carte.</p>
      <p class="text-xs text-gray-400 mt-1">Cliquez sur "Ajouter un point" pour commencer.</p>
    </div>
  </div>
</template>
