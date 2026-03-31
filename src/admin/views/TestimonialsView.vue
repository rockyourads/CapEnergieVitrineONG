<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { Testimonial } from '@/types/data'

const store = useAdminStore()

const showAddForm = ref(false)
const newTestimonial = ref<Testimonial>({ key: '', initials: '', org: '' })

function addTestimonial() {
  if (!newTestimonial.value.key.trim() || !newTestimonial.value.initials.trim()) {
    store.showToast('La cle et les initiales sont requises', 'error')
    return
  }
  store.testimonials.push({ ...newTestimonial.value })
  newTestimonial.value = { key: '', initials: '', org: '' }
  showAddForm.value = false
}

function removeTestimonial(index: number) {
  const t = store.testimonials[index]
  if (!t || !confirm(`Supprimer le temoignage "${t.key}" ?`)) return
  store.testimonials.splice(index, 1)
}

async function save() {
  await store.saveTestimonials()
}
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Temoignages</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ store.testimonials.length }} temoignage{{ store.testimonials.length > 1 ? 's' : '' }}</p>
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

    <!-- Info hint -->
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div class="flex gap-3">
        <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="text-sm font-medium text-amber-800">Textes des temoignages</p>
          <p class="text-xs text-amber-700 mt-1">
            Les textes (citations) des temoignages sont geres dans la section
            <strong>Contenu &gt; Temoignages</strong> (fichiers i18n). Ici, vous gerez uniquement
            les metadonnees (cle, initiales, organisation).
          </p>
        </div>
      </div>
    </div>

    <!-- Add form -->
    <div v-if="showAddForm" class="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
      <h2 class="text-sm font-semibold text-gray-700">Nouveau temoignage</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Cle i18n *</label>
          <input
            v-model="newTestimonial.key"
            type="text"
            placeholder="Ex: testimonial1"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Initiales *</label>
          <input
            v-model="newTestimonial.initials"
            type="text"
            placeholder="Ex: JD"
            maxlength="3"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Organisation</label>
          <input
            v-model="newTestimonial.org"
            type="text"
            placeholder="Ex: Croix Rouge"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          @click="showAddForm = false"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="addTestimonial"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter
        </button>
      </div>
    </div>

    <!-- Testimonials list -->
    <div v-if="store.testimonials.length" class="space-y-3">
      <div
        v-for="(testimonial, index) in store.testimonials"
        :key="index"
        class="bg-white rounded-xl border border-gray-100 p-5"
      >
        <div class="flex items-center gap-4">
          <!-- Initials avatar -->
          <div class="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
            <span class="text-sm font-bold text-blue-600">{{ testimonial.initials }}</span>
          </div>

          <!-- Editable fields -->
          <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Cle i18n</label>
              <input
                v-model="testimonial.key"
                type="text"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Initiales</label>
              <input
                v-model="testimonial.initials"
                type="text"
                maxlength="3"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Organisation</label>
              <input
                v-model="testimonial.org"
                type="text"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Delete -->
          <button
            @click="removeTestimonial(index)"
            class="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <p class="text-sm text-gray-400">Aucun temoignage pour le moment.</p>
      <p class="text-xs text-gray-400 mt-1">Cliquez sur "Ajouter" pour commencer.</p>
    </div>
  </div>
</template>
