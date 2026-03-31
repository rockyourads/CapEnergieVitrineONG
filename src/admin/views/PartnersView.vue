<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { Partner } from '@/types/data'

const store = useAdminStore()

const newPartner = ref<Partner>({ name: '', logo: '' })

function addPartner() {
  if (!newPartner.value.name.trim()) {
    store.showToast('Le nom du partenaire est requis', 'error')
    return
  }
  store.partners.push({ ...newPartner.value })
  newPartner.value = { name: '', logo: '' }
}

function removePartner(index: number) {
  const p = store.partners[index]
  if (!p || !confirm(`Supprimer le partenaire "${p.name}" ?`)) return
  store.partners.splice(index, 1)
}

function moveUp(index: number) {
  if (index <= 0) return
  const item = store.partners[index]
  if (!item) return
  store.partners.splice(index, 1)
  store.partners.splice(index - 1, 0, item)
}

function moveDown(index: number) {
  if (index >= store.partners.length - 1) return
  const item = store.partners[index]
  if (!item) return
  store.partners.splice(index, 1)
  store.partners.splice(index + 1, 0, item)
}

async function save() {
  await store.savePartners()
}
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Partenaires</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ store.partners.length }} partenaire{{ store.partners.length > 1 ? 's' : '' }}</p>
      </div>
      <button
        @click="save"
        :disabled="store.saving"
        class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ store.saving ? 'Sauvegarde...' : 'Enregistrer' }}
      </button>
    </div>

    <!-- Add new partner -->
    <div class="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h2 class="text-sm font-semibold text-gray-700 mb-4">Ajouter un partenaire</h2>
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-500 mb-1">Nom *</label>
          <input
            v-model="newPartner.name"
            type="text"
            placeholder="Ex: Croix Rouge"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-500 mb-1">Chemin du logo</label>
          <input
            v-model="newPartner.logo"
            type="text"
            placeholder="Ex: /images/partners/croix-rouge.png"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="addPartner"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Partners grid -->
    <div v-if="store.partners.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(partner, index) in store.partners"
        :key="index"
        class="bg-white rounded-xl border border-gray-100 p-4 group"
      >
        <!-- Logo preview -->
        <div class="w-full h-24 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          <img
            v-if="partner.logo"
            :src="partner.logo"
            :alt="partner.name"
            class="max-h-full max-w-full object-contain p-2"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
          <svg v-else class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <!-- Editable fields -->
        <div class="space-y-2">
          <input
            v-model="partner.name"
            type="text"
            class="w-full px-2.5 py-1.5 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            v-model="partner.logo"
            type="text"
            placeholder="Chemin du logo..."
            class="w-full px-2.5 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div class="flex items-center gap-1">
            <button
              @click="moveUp(index)"
              :disabled="index === 0"
              class="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Monter"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              @click="moveDown(index)"
              :disabled="index === store.partners.length - 1"
              class="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Descendre"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <button
            @click="removePartner(index)"
            class="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
            title="Supprimer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-sm text-gray-400">Aucun partenaire pour le moment.</p>
      <p class="text-xs text-gray-400 mt-1">Utilisez le formulaire ci-dessus pour en ajouter.</p>
    </div>
  </div>
</template>
