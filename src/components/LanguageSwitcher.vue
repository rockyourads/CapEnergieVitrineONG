<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function setLocale(lang: string) {
  locale.value = lang
  localStorage.setItem('locale', lang)
  document.documentElement.lang = lang
}
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      @click="setLocale('fr')"
      :class="[
        'w-8 h-6 rounded overflow-hidden transition-all border-2',
        locale === 'fr' ? 'border-primary scale-110' : 'border-transparent opacity-60 hover:opacity-100'
      ]"
      :title="'Français'"
      aria-label="Français"
    >
      <!-- French flag -->
      <svg viewBox="0 0 32 24" class="w-full h-full">
        <rect x="0" y="0" width="11" height="24" fill="#002654" />
        <rect x="11" y="0" width="10" height="24" fill="#FFFFFF" />
        <rect x="21" y="0" width="11" height="24" fill="#CE1126" />
      </svg>
    </button>
    <button
      @click="setLocale('en')"
      :class="[
        'w-8 h-6 rounded overflow-hidden transition-all border-2',
        locale === 'en' ? 'border-primary scale-110' : 'border-transparent opacity-60 hover:opacity-100'
      ]"
      :title="'English'"
      aria-label="English"
    >
      <!-- UK flag simplified -->
      <svg viewBox="0 0 32 24" class="w-full h-full">
        <rect width="32" height="24" fill="#012169" />
        <path d="M0 0L32 24M32 0L0 24" stroke="#FFFFFF" stroke-width="4" />
        <path d="M0 0L32 24M32 0L0 24" stroke="#C8102E" stroke-width="2" />
        <path d="M16 0V24M0 12H32" stroke="#FFFFFF" stroke-width="6" />
        <path d="M16 0V24M0 12H32" stroke="#C8102E" stroke-width="3.6" />
      </svg>
    </button>
  </div>
</template>
