<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()

interface Gallery {
  name: string
  count: number
  totalSize: number
}

interface GalleryFile {
  name: string
  path: string
  size: number
  modified: string
}

const galleries = ref<Gallery[]>([])
const selectedGallery = ref<string | null>(null)
const galleryFiles = ref<GalleryFile[]>([])
const loading = ref(true)
const newGalleryName = ref('')
const showNewGalleryForm = ref(false)
const uploading = ref(false)
const isDragging = ref(false)

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

async function loadGalleries() {
  loading.value = true
  try {
    const res = await fetch('/api/media')
    if (res.ok) galleries.value = await res.json()
  } catch {
    store.showToast('Erreur lors du chargement des galeries', 'error')
  }
  loading.value = false
}

async function openGallery(name: string) {
  selectedGallery.value = name
  try {
    const res = await fetch(`/api/media/${name}`)
    if (res.ok) galleryFiles.value = await res.json()
  } catch {
    galleryFiles.value = []
  }
}

async function deleteImage(gallery: string, filename: string) {
  if (!confirm(`Supprimer "${filename}" ?`)) return
  try {
    const res = await fetch(`/api/media/${gallery}/${filename}`, { method: 'DELETE' })
    if (res.ok) {
      galleryFiles.value = galleryFiles.value.filter(f => f.name !== filename)
      const g = galleries.value.find(g => g.name === gallery)
      if (g) g.count--
      store.showToast('Image supprimee')
    }
  } catch {
    store.showToast('Erreur lors de la suppression', 'error')
  }
}

async function createGallery() {
  if (!newGalleryName.value.trim()) {
    store.showToast('Le nom de la galerie est requis', 'error')
    return
  }
  try {
    const res = await fetch('/api/media/create-gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGalleryName.value.trim() }),
    })
    if (res.ok) {
      store.showToast('Galerie creee')
      newGalleryName.value = ''
      showNewGalleryForm.value = false
      await loadGalleries()
    }
  } catch {
    store.showToast('Erreur lors de la creation', 'error')
  }
}

async function uploadFiles(files: FileList | File[]) {
  if (!files.length || !selectedGallery.value) return

  uploading.value = true
  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file, file.name)
  }

  try {
    const res = await fetch(`/api/media/upload?gallery=${selectedGallery.value}`, {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      store.showToast(`${files.length} fichier(s) envoye(s)`)
      await openGallery(selectedGallery.value)
      await loadGalleries()
    }
  } catch {
    store.showToast('Erreur lors de l\'upload', 'error')
  }
  uploading.value = false
}

function handleFileInput(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    uploadFiles(input.files)
    input.value = ''
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files) {
    uploadFiles(event.dataTransfer.files)
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

async function regenerateManifest() {
  if (!confirm('Regenerer le manifest des galeries ?')) return
  try {
    const res = await fetch('/api/manifest/regenerate', { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      store.showToast(`Manifest regenere avec ${data.galleries} galeries`)
      await loadGalleries()
    }
  } catch {
    store.showToast('Erreur lors de la regeneration', 'error')
  }
}

onMounted(loadGalleries)
</script>

<template>
  <div class="max-w-6xl">
    <!-- Back to galleries -->
    <div v-if="selectedGallery" class="mb-6">
      <button
        @click="selectedGallery = null; galleryFiles = []"
        class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux galeries
      </button>
    </div>

    <!-- ========== GALLERY LIST ========== -->
    <div v-if="!selectedGallery">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-lg font-semibold text-gray-900">Mediatheque</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ galleries.length }} galerie{{ galleries.length > 1 ? 's' : '' }}</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="regenerateManifest"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Regenerer manifest
          </button>
          <button
            @click="showNewGalleryForm = !showNewGalleryForm"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouvelle galerie
          </button>
        </div>
      </div>

      <!-- New gallery form -->
      <div v-if="showNewGalleryForm" class="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h2 class="text-sm font-semibold text-gray-700 mb-3">Creer une galerie</h2>
        <div class="flex items-end gap-3">
          <div class="flex-1">
            <label class="block text-xs font-medium text-gray-500 mb-1">Nom de la galerie *</label>
            <input
              v-model="newGalleryName"
              type="text"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="nom-galerie (minuscules, tirets)"
              @keyup.enter="createGallery"
            />
          </div>
          <button
            @click="createGallery"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Creer
          </button>
          <button
            @click="showNewGalleryForm = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>

      <!-- Gallery cards grid -->
      <div v-if="galleries.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          v-for="g in galleries"
          :key="g.name"
          @click="openGallery(g.name)"
          class="bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-md transition-shadow group"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{{ g.name }}</p>
              <p class="text-xs text-gray-500">{{ g.count }} photo{{ g.count > 1 ? 's' : '' }} -- {{ formatSize(g.totalSize) }}</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <p class="text-sm text-gray-400">Chargement des galeries...</p>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && !galleries.length" class="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-sm text-gray-400">Aucune galerie trouvee.</p>
        <p class="text-xs text-gray-400 mt-1">Cliquez sur "Nouvelle galerie" pour commencer.</p>
      </div>
    </div>

    <!-- ========== GALLERY DETAIL ========== -->
    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-lg font-semibold text-gray-900">{{ selectedGallery }}</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ galleryFiles.length }} fichier{{ galleryFiles.length > 1 ? 's' : '' }}</p>
        </div>
        <label class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {{ uploading ? 'Upload en cours...' : 'Ajouter des photos' }}
          <input type="file" multiple accept="image/*" class="hidden" @change="handleFileInput" :disabled="uploading" />
        </label>
      </div>

      <!-- Drag & drop zone -->
      <div
        class="border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors"
        :class="isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50/50'"
        @drop.prevent="handleDrop"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
      >
        <svg class="w-10 h-10 mx-auto mb-3" :class="isDragging ? 'text-blue-500' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="text-sm font-medium" :class="isDragging ? 'text-blue-700' : 'text-gray-600'">
          {{ isDragging ? 'Deposez les fichiers ici' : 'Glissez-deposez vos images ici' }}
        </p>
        <p class="text-xs text-gray-400 mt-1">ou utilisez le bouton "Ajouter des photos" ci-dessus</p>
      </div>

      <!-- Images grid -->
      <div v-if="galleryFiles.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          v-for="file in galleryFiles"
          :key="file.name"
          class="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
        >
          <img
            :src="file.path"
            :alt="file.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col items-start justify-end p-2 opacity-0 group-hover:opacity-100">
            <div class="flex items-end justify-between w-full">
              <div class="min-w-0 flex-1">
                <p class="text-white text-xs truncate">{{ file.name }}</p>
                <p class="text-white/70 text-xs">{{ formatSize(file.size) }}</p>
              </div>
              <button
                @click="deleteImage(selectedGallery!, file.name)"
                class="flex-shrink-0 p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ml-2"
                title="Supprimer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty gallery -->
      <div v-else class="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-sm text-gray-400">Cette galerie est vide.</p>
        <p class="text-xs text-gray-400 mt-1">Deposez des images ou utilisez le bouton d'upload.</p>
      </div>
    </div>
  </div>
</template>
