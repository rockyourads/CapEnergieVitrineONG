<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()
const router = useRouter()
const search = ref('')
const filterCountry = ref('')

const countries = computed(() => [...new Set(store.projects.map(p => p.country))].sort())

const filtered = computed(() => {
  return store.projects.filter(p => {
    if (search.value && !p.title.toLowerCase().includes(search.value.toLowerCase()) && !p.country.toLowerCase().includes(search.value.toLowerCase())) return false
    if (filterCountry.value && p.country !== filterCountry.value) return false
    return true
  })
})

function deleteProject(id: string) {
  if (!confirm('Supprimer ce projet ?')) return
  store.projects = store.projects.filter(p => p.id !== id)
  store.saveProjects()
}
</script>

<template>
  <div class="max-w-6xl">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3 flex-1 w-full sm:w-auto">
        <!-- Search -->
        <div class="relative flex-1 max-w-sm">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher..."
            class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <!-- Country filter -->
        <select
          v-model="filterCountry"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les pays</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <button
        @click="router.push('/admin/projects/new')"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nouveau projet
      </button>
    </div>

    <!-- Count -->
    <p class="text-sm text-gray-500 mb-4">{{ filtered.length }} projet{{ filtered.length > 1 ? 's' : '' }}</p>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Projet</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Pays</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Client</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Type</th>
              <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Galerie</th>
              <th class="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in filtered"
              :key="project.id"
              class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
            >
              <td class="px-5 py-3">
                <button
                  @click="router.push(`/admin/projects/${project.id}`)"
                  class="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                >
                  {{ project.title }}
                </button>
              </td>
              <td class="px-5 py-3">
                <span class="text-sm text-gray-600">{{ project.country }}</span>
              </td>
              <td class="px-5 py-3">
                <span class="text-sm text-gray-600">{{ project.client }}</span>
              </td>
              <td class="px-5 py-3">
                <span class="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  {{ project.clientType }}
                </span>
              </td>
              <td class="px-5 py-3">
                <span v-if="project.galleryFolder" class="text-xs text-emerald-600 font-medium">
                  {{ project.galleryFolder }}
                </span>
                <span v-else class="text-xs text-gray-400">—</span>
              </td>
              <td class="px-5 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="router.push(`/admin/projects/${project.id}`)"
                    class="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
                    title="Modifier"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click.stop="deleteProject(project.id)"
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
          </tbody>
        </table>
      </div>
      <div v-if="filtered.length === 0" class="p-8 text-center text-gray-400 text-sm">
        Aucun projet trouvé.
      </div>
    </div>
  </div>
</template>
