<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="bg-dark text-gray-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company info -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">CE</div>
            <span class="text-lg font-bold text-white tracking-tight">Cap Énergie</span>
          </div>
          <p class="text-sm leading-relaxed">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="text-white font-semibold mb-4">{{ t('footer.navigation') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/" class="hover:text-primary transition-colors">{{ t('nav.home') }}</RouterLink></li>
            <li><RouterLink to="/projets" class="hover:text-primary transition-colors">{{ t('nav.projects') }}</RouterLink></li>
            <li><RouterLink to="/a-propos" class="hover:text-primary transition-colors">{{ t('nav.about') }}</RouterLink></li>
            <li><RouterLink to="/devis" class="hover:text-primary transition-colors">{{ t('nav.quote') }}</RouterLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold mb-4">{{ t('footer.contact') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>Montpellier, France</li>
            <li>
              <a href="tel:+33467567791" class="hover:text-primary transition-colors">
                +33 (0)4 67 56 77 91
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@capenergieongirdoffgridsol9695"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Cap Énergie (CAPENERGIE). {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
