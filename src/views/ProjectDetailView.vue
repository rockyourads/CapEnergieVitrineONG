<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const project = projects.find(p => p.id === route.params.id)
const gallery = ref<string[]>([])
const lightboxIndex = ref(-1)

// Find related projects (same country or client, max 3)
const relatedProjects = computed(() => {
  if (!project) return []
  return projects
    .filter(p => p.id !== project.id && (p.country === project.country || p.client === project.client))
    .slice(0, 3)
})

onMounted(async () => {
  if (!project?.galleryFolder) return
  try {
    const res = await fetch('/images/esf/manifest.json')
    const manifest: Record<string, string[]> = await res.json()
    gallery.value = manifest[project.galleryFolder] || []
  } catch {
    gallery.value = []
  }
})

function openLightbox(index: number) {
  lightboxIndex.value = index
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxIndex.value = -1
  document.body.style.overflow = ''
}

function prevImage() {
  if (lightboxIndex.value > 0) lightboxIndex.value--
  else lightboxIndex.value = gallery.value.length - 1
}

function nextImage() {
  if (lightboxIndex.value < gallery.value.length - 1) lightboxIndex.value++
  else lightboxIndex.value = 0
}

function onKeydown(e: KeyboardEvent) {
  if (lightboxIndex.value < 0) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="project">
    <!-- Hero with cover photo -->
    <section class="relative bg-dark text-white overflow-hidden">
      <div v-if="gallery.length" class="absolute inset-0">
        <img :src="gallery[0]" :alt="project.title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/40"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <button
          @click="router.push({ name: 'projects' })"
          class="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2 transition-colors text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ t('projectsPage.title') }}
        </button>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6">{{ project.title }}</h1>
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <span class="text-sm bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            {{ project.country }}
          </span>
          <span class="text-sm bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            {{ project.category }}
          </span>
          <span class="text-sm bg-primary/20 text-primary-light px-4 py-1.5 rounded-full border border-primary/20">
            {{ project.client }}
          </span>
        </div>
        <p class="text-lg text-gray-300 max-w-3xl leading-relaxed">{{ project.description }}</p>

        <!-- Stats -->
        <div v-if="gallery.length" class="mt-8 flex items-center gap-6">
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ gallery.length }} photos
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ project.country }}
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section v-if="gallery.length" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-2">Galerie photos</h2>
        <p class="text-gray mb-8">Cliquez sur une photo pour l'agrandir</p>

        <!-- Featured photo (first one large) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button
            @click="openLightbox(0)"
            class="aspect-[4/3] overflow-hidden rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              :src="gallery[0]"
              :alt="`${project.title} - Photo 1`"
              class="w-full h-full object-cover"
            />
          </button>
          <div v-if="gallery.length > 1" class="grid grid-cols-2 gap-4">
            <button
              v-for="i in Math.min(4, gallery.length - 1)"
              :key="i"
              @click="openLightbox(i)"
              class="aspect-square overflow-hidden rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary relative"
            >
              <img
                :src="gallery[i]"
                :alt="`${project.title} - Photo ${i + 1}`"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <!-- "See more" overlay on last visible -->
              <div
                v-if="i === Math.min(4, gallery.length - 1) && gallery.length > 5"
                class="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <span class="text-white font-bold text-lg">+{{ gallery.length - 5 }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Remaining photos in grid -->
        <div v-if="gallery.length > 5" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
          <button
            v-for="(img, i) in gallery.slice(5)"
            :key="img"
            @click="openLightbox(i + 5)"
            class="aspect-square overflow-hidden rounded-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              :src="img"
              :alt="`${project.title} - Photo ${i + 6}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section>

    <!-- No gallery fallback -->
    <section v-else class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-gray">Photos bientôt disponibles pour ce projet.</p>
      </div>
    </section>

    <!-- Related projects -->
    <section v-if="relatedProjects.length" class="py-16 bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-8">Projets similaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink
            v-for="rp in relatedProjects"
            :key="rp.id"
            :to="{ name: 'project-detail', params: { id: rp.id } }"
            class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
          >
            <div class="h-40 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
              <svg class="w-12 h-12 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="p-5">
              <span class="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                {{ rp.country }}
              </span>
              <h3 class="font-bold mt-2 group-hover:text-primary transition-colors">{{ rp.title }}</h3>
              <p class="text-sm text-gray mt-1">{{ rp.client }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-dark text-white text-center">
      <div class="max-w-2xl mx-auto px-4">
        <h2 class="text-2xl font-bold mb-4">{{ t('cta.title') }}</h2>
        <RouterLink
          to="/devis"
          class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-bold rounded-lg hover:bg-accent-light transition-all"
        >
          {{ t('cta.button') }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxIndex >= 0"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="absolute top-4 left-4 text-white/70 text-sm font-medium">
          {{ lightboxIndex + 1 }} / {{ gallery.length }}
        </div>

        <button
          @click="prevImage"
          class="absolute left-2 sm:left-6 text-white/70 hover:text-white p-2 z-10"
        >
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <img
          :src="gallery[lightboxIndex]"
          :alt="`${project.title} - Photo ${lightboxIndex + 1}`"
          class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
        />

        <button
          @click="nextImage"
          class="absolute right-2 sm:right-6 text-white/70 hover:text-white p-2 z-10"
        >
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Teleport>
  </div>

  <!-- 404 -->
  <div v-else class="py-32 text-center">
    <h1 class="text-2xl font-bold mb-4">Projet non trouvé</h1>
    <RouterLink
      to="/projets"
      class="text-primary hover:text-primary-dark font-medium"
    >
      Retour aux projets
    </RouterLink>
  </div>
</template>
