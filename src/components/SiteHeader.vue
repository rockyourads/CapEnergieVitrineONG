<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/devis', label: 'Demander un devis' },
]
</script>

<template>
  <header class="bg-dark text-white sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">CE</div>
          <span class="text-lg font-bold tracking-tight">Cap Énergie</span>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              link.to === '/devis'
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 text-gray-300 hover:text-white"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <nav v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'block px-4 py-2 rounded-md text-sm font-medium transition-colors',
            link.to === '/devis'
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          ]"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
