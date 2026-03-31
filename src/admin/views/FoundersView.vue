<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { Founder } from '@/types/data'

const store = useAdminStore()

const showAddForm = ref(false)
const newFounder = ref<Founder>({ name: '', role: '', description: '', image: '' })

function addFounder() {
  if (!newFounder.value.name.trim() || !newFounder.value.role.trim()) {
    store.showToast('Le nom et le rôle sont requis', 'error')
    return
  }
  store.founders.push({ ...newFounder.value })
  newFounder.value = { name: '', role: '', description: '', image: '' }
  showAddForm.value = false
}

function removeFounder(index: number) {
  const f = store.founders[index]
  if (!f || !confirm(`Supprimer le fondateur "${f.name}" ?`)) return
  store.founders.splice(index, 1)
}

async function save() {
  await store.saveFounders()
}
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Fondateurs</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ store.founders.length }} fondateur{{ store.founders.length > 1 ? 's' : '' }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="showAddForm = !showAddForm"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter
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

    <!-- Add form -->
    <div v-if="showAddForm" class="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
      <h2 class="text-sm font-semibold text-gray-700">Nouveau fondateur</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Nom *</label>
          <input
            v-model="newFounder.name"
            type="text"
            placeholder="Ex: Sebastien Weibel"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Role *</label>
          <input
            v-model="newFounder.role"
            type="text"
            placeholder="Ex: Directeur General"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Description</label>
        <textarea
          v-model="newFounder.description"
          rows="3"
          placeholder="Courte description du fondateur..."
          class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        ></textarea>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Chemin de l'image</label>
        <input
          v-model="newFounder.image"
          type="text"
          placeholder="Ex: /images/founders/sebastien.jpg"
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
          @click="addFounder"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter le fondateur
        </button>
      </div>
    </div>

    <!-- Founders list -->
    <div v-if="store.founders.length" class="space-y-4">
      <div
        v-for="(founder, index) in store.founders"
        :key="index"
        class="bg-white rounded-xl border border-gray-100 p-6"
      >
        <div class="flex gap-5">
          <!-- Image preview -->
          <div class="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              v-if="founder.image"
              :src="founder.image"
              :alt="founder.name"
              class="w-full h-full object-cover"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
            <svg v-else class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <!-- Editable fields -->
          <div class="flex-1 space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Nom</label>
                <input
                  v-model="founder.name"
                  type="text"
                  class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Role</label>
                <input
                  v-model="founder.role"
                  type="text"
                  class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Description</label>
              <textarea
                v-model="founder.description"
                rows="2"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Chemin de l'image</label>
              <input
                v-model="founder.image"
                type="text"
                placeholder="/images/founders/..."
                class="w-full px-2.5 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Delete -->
          <div class="flex-shrink-0">
            <button
              @click="removeFounder(index)"
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
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <p class="text-sm text-gray-400">Aucun fondateur pour le moment.</p>
      <p class="text-xs text-gray-400 mt-1">Cliquez sur "Ajouter" pour commencer.</p>
    </div>
  </div>
</template>
