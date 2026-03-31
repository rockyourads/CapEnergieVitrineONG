<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const route = useRoute()
const store = useAdminStore()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': 'Tableau de bord',
    '/admin/projects': 'Projets',
    '/admin/content': 'Contenu du site',
    '/admin/partners': 'Partenaires',
    '/admin/founders': 'Fondateurs',
    '/admin/testimonials': 'Témoignages',
    '/admin/map': 'Carte du monde',
    '/admin/media': 'Galerie média',
    '/admin/settings': 'Paramètres',
  }
  // Check exact match first, then prefix match
  if (titles[route.path]) return titles[route.path]
  if (route.path.startsWith('/admin/projects/')) return 'Édition projet'
  return 'Administration'
})
</script>

<template>
  <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
    <div class="flex items-center gap-4">
      <h1 class="text-lg font-semibold text-gray-900">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center gap-3">
      <!-- Saving indicator -->
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="store.saving" class="flex items-center gap-2 text-sm text-gray-500">
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Sauvegarde...
        </div>
      </Transition>

      <!-- Status dot -->
      <div class="flex items-center gap-2 text-xs text-gray-400">
        <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
        Dev local
      </div>
    </div>
  </header>
</template>
