<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import type { Project } from '@/types/data'

const route = useRoute()
const router = useRouter()
const store = useAdminStore()

const isNew = computed(() => route.params.id === 'new')

const form = ref<Project>({
  id: '',
  title: '',
  country: '',
  countryCode: '',
  client: '',
  clientType: 'ONG',
  category: 'Site Isolé / Off Grid',
  description: '',
  image: '',
  galleryFolder: null,
})

const gallery = ref<{ name: string; path: string; size: number }[]>([])

onMounted(async () => {
  if (!isNew.value) {
    const existing = store.projects.find(p => p.id === route.params.id)
    if (existing) {
      form.value = { ...existing }
      if (existing.galleryFolder) {
        try {
          const res = await fetch(`/api/media/${existing.galleryFolder}`)
          if (res.ok) gallery.value = await res.json()
        } catch { /* ignore */ }
      }
    }
  }
})

function generateId() {
  form.value.id = form.value.title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function save() {
  if (!form.value.id || !form.value.title) {
    store.showToast('Titre requis', 'error')
    return
  }

  if (isNew.value) {
    store.projects.push({ ...form.value })
  } else {
    const idx = store.projects.findIndex(p => p.id === route.params.id)
    if (idx >= 0) store.projects[idx] = { ...form.value }
  }

  await store.saveProjects()
  router.push('/admin/projects')
}

const clientTypes = ['ONG', 'Institutionnel', 'Privé']
const categories = ['Site Isolé / Off Grid', 'Autoconsommation', 'Pompage solaire', 'Site Isolé']
</script>

<template>
  <div class="max-w-3xl">
    <!-- Back -->
    <button
      @click="router.push('/admin/projects')"
      class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Retour aux projets
    </button>

    <form @submit.prevent="save" class="space-y-6">
      <!-- Main info card -->
      <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 class="text-base font-semibold text-gray-900">Informations générales</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre du projet</label>
          <input
            v-model="form.title"
            @blur="isNew && !form.id && generateId()"
            type="text"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Croix Rouge - Cebu"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Identifiant (slug)</label>
            <input
              v-model="form.id"
              type="text"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="croix-rouge-cebu"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Code pays (2 lettres)</label>
            <input
              v-model="form.countryCode"
              type="text"
              maxlength="2"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              placeholder="PH"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pays</label>
            <input
              v-model="form.country"
              type="text"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Philippines"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <input
              v-model="form.client"
              type="text"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Électriciens Sans Frontières"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type de client</label>
            <select
              v-model="form.clientType"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="t in clientTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              v-model="form.category"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Description du projet..."
          ></textarea>
        </div>
      </div>

      <!-- Gallery card -->
      <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 class="text-base font-semibold text-gray-900">Galerie photos</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dossier galerie</label>
          <input
            v-model="form.galleryFolder"
            type="text"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="nom-du-dossier (dans public/images/esf/)"
          />
        </div>

        <!-- Gallery preview -->
        <div v-if="gallery.length" class="grid grid-cols-4 sm:grid-cols-6 gap-2">
          <div
            v-for="img in gallery.slice(0, 12)"
            :key="img.name"
            class="aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              :src="img.path"
              :alt="img.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            v-if="gallery.length > 12"
            class="aspect-square rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <span class="text-sm font-medium text-gray-500">+{{ gallery.length - 12 }}</span>
          </div>
        </div>
        <p v-else-if="form.galleryFolder" class="text-sm text-gray-400">
          Aucune photo trouvée dans ce dossier.
        </p>
      </div>

      <!-- Save bar -->
      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          @click="router.push('/admin/projects')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ isNew ? 'Créer le projet' : 'Enregistrer' }}
        </button>
      </div>
    </form>
  </div>
</template>
