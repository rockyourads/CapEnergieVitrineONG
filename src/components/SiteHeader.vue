<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/projets', label: t('nav.projects') },
  { to: '/a-propos', label: t('nav.about') },
  { to: '/devis', label: t('nav.quote') },
])

// Close menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
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
          <div class="ml-3 pl-3 border-l border-white/20">
            <LanguageSwitcher />
          </div>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            class="p-2 text-gray-300 hover:text-white"
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
      </div>
    </div>

    <!-- Mobile menu dropdown -->
    <div v-if="mobileMenuOpen" class="mobile-menu md:hidden">
      <nav class="px-4 pb-6 pt-2 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'block px-4 py-3 rounded-lg text-lg font-medium transition-colors',
            link.to === '/devis'
              ? 'bg-primary text-white hover:bg-primary-dark mt-3'
              : 'text-gray-200 hover:text-white hover:bg-white/10'
          ]"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
      <div class="border-t border-white/10 px-8 py-4 text-center text-sm text-gray-400">
        <a href="tel:+33467567791" class="hover:text-white">+33 (0)4 67 56 77 91</a>
        <span class="mx-2">·</span>
        <span>Montpellier, France</span>
      </div>
    </div>
  </header>

  <!-- Backdrop overlay when mobile menu is open -->
  <Teleport to="body">
    <div
      v-if="mobileMenuOpen"
      class="md:hidden fixed inset-0 bg-black/50 z-40"
      @click="mobileMenuOpen = false"
    />
  </Teleport>
</template>

<style scoped>
.mobile-menu {
  background-color: #0d1821;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
