<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()
const router = useRouter()

const stats = computed(() => [
  {
    label: 'Projets',
    value: store.projects.length,
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    color: 'bg-blue-50 text-blue-600',
    to: '/admin/projects',
  },
  {
    label: 'Pays',
    value: new Set(store.projects.map(p => p.country)).size,
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'bg-emerald-50 text-emerald-600',
    to: '/admin/map',
  },
  {
    label: 'Partenaires',
    value: store.partners.length,
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    color: 'bg-amber-50 text-amber-600',
    to: '/admin/partners',
  },
  {
    label: 'Langues',
    value: 2,
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    color: 'bg-purple-50 text-purple-600',
    to: '/admin/content',
  },
])

const quickActions = [
  { label: 'Ajouter un projet', to: '/admin/projects/new', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  { label: 'Modifier le contenu', to: '/admin/content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { label: 'Gérer les médias', to: '/admin/media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Paramètres du site', to: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
]
</script>

<template>
  <div class="max-w-6xl">
    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      <button
        v-for="stat in stats"
        :key="stat.label"
        @click="router.push(stat.to)"
        class="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow text-left group"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="stat.color">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" :d="stat.icon" />
            </svg>
          </div>
          <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        <p class="text-sm text-gray-500 mt-0.5">{{ stat.label }}</p>
      </button>
    </div>

    <!-- Quick actions -->
    <div class="mb-10">
      <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Actions rapides</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="action in quickActions"
          :key="action.label"
          @click="router.push(action.to)"
          class="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all text-left group"
        >
          <div class="w-9 h-9 bg-gray-50 group-hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{{ action.label }}</span>
        </button>
      </div>
    </div>

    <!-- Recent projects -->
    <div>
      <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Projets récents</h2>
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div
          v-for="project in store.projects.slice(0, 5)"
          :key="project.id"
          class="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors"
          @click="router.push(`/admin/projects/${project.id}`)"
        >
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <span class="text-xs font-bold text-blue-400">{{ project.countryCode }}</span>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ project.title }}</p>
            <p class="text-xs text-gray-500">{{ project.country }} — {{ project.client }}</p>
          </div>
          <span class="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full whitespace-nowrap">
            {{ project.category }}
          </span>
        </div>
        <div v-if="store.projects.length === 0" class="p-8 text-center text-gray-400 text-sm">
          Chargement des projets...
        </div>
      </div>
    </div>
  </div>
</template>
