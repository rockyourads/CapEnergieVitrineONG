<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, countries } from '@/data/projects'

const selectedCountry = ref('')
const selectedType = ref('')

const filteredProjects = computed(() => {
  return projects.filter(p => {
    if (selectedCountry.value && p.country !== selectedCountry.value) return false
    if (selectedType.value && p.clientType !== selectedType.value) return false
    return true
  })
})

const clientTypes = [...new Set(projects.map(p => p.clientType))]

function clearFilters() {
  selectedCountry.value = ''
  selectedType.value = ''
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-dark text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">Nos projets</h1>
        <p class="text-lg text-gray-300 max-w-2xl">
          Découvrez nos installations photovoltaïques réalisées pour des ONG
          et organisations dans le monde entier.
        </p>
      </div>
    </section>

    <!-- Filters + Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-8">
          <select
            v-model="selectedCountry"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Tous les pays</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
          <select
            v-model="selectedType"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Tous les types</option>
            <option v-for="t in clientTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <button
            v-if="selectedCountry || selectedType"
            @click="clearFilters"
            class="px-4 py-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Effacer les filtres
          </button>
        </div>

        <!-- Results count -->
        <p class="text-sm text-gray mb-6">
          {{ filteredProjects.length }} projet{{ filteredProjects.length > 1 ? 's' : '' }} trouvé{{ filteredProjects.length > 1 ? 's' : '' }}
        </p>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div class="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <svg class="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {{ project.country }}
                </span>
                <span class="text-xs font-medium bg-gray-100 text-gray px-2 py-1 rounded-full">
                  {{ project.clientType }}
                </span>
              </div>
              <h3 class="font-semibold text-lg mb-1">{{ project.title }}</h3>
              <p class="text-sm text-gray mb-3">{{ project.category }}</p>
              <p class="text-sm text-gray-600 leading-relaxed">{{ project.description }}</p>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredProjects.length === 0" class="text-center py-16">
          <p class="text-gray text-lg">Aucun projet ne correspond à vos filtres.</p>
          <button @click="clearFilters" class="mt-4 text-primary hover:text-primary-dark font-medium">
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
