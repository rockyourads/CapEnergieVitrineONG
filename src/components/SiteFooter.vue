<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formData = ref({ name: '', org: '', type: '', country: '' })
const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 3000)
}
</script>

<template>
  <footer class="bg-dark text-gray-400">
    <!-- Top band: short form -->
    <div class="border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div class="lg:w-1/3">
            <h3 class="text-xl font-bold text-white mb-2">{{ t('footerForm.title') }}</h3>
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent text-sm font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ t('footerForm.promise') }}
            </div>
          </div>
          <form
            v-if="!submitted"
            class="flex-1 flex flex-col sm:flex-row gap-3 w-full"
            @submit.prevent="handleSubmit"
          >
            <input
              v-model="formData.name"
              type="text"
              :placeholder="t('footerForm.name')"
              required
              class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <input
              v-model="formData.org"
              type="text"
              :placeholder="t('footerForm.org')"
              required
              class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <select
              v-model="formData.type"
              required
              class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-primary focus:outline-none"
            >
              <option value="" disabled class="text-dark">{{ t('footerForm.projectType') }}</option>
              <option value="hospital" class="text-dark">{{ t('footerForm.types.hospital') }}</option>
              <option value="village" class="text-dark">{{ t('footerForm.types.village') }}</option>
              <option value="pump" class="text-dark">{{ t('footerForm.types.pump') }}</option>
              <option value="logistics" class="text-dark">{{ t('footerForm.types.logistics') }}</option>
              <option value="other" class="text-dark">{{ t('footerForm.types.other') }}</option>
            </select>
            <input
              v-model="formData.country"
              type="text"
              :placeholder="t('footerForm.country')"
              required
              class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              class="px-6 py-3 bg-accent text-dark font-bold rounded-lg hover:bg-accent-light transition-colors whitespace-nowrap"
            >
              {{ t('footerForm.send') }}
            </button>
          </form>
          <div v-else class="flex-1 flex items-center gap-2 text-accent font-medium">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Merci ! Nous vous recontacterons sous 48h.
          </div>
        </div>
      </div>
    </div>

    <!-- Main footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
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

        <!-- Services -->
        <div>
          <h3 class="text-white font-semibold mb-4">{{ t('footer.services') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>{{ t('footer.servicesList.offgrid') }}</li>
            <li>{{ t('footer.servicesList.pumping') }}</li>
            <li>{{ t('footer.servicesList.medical') }}</li>
            <li>{{ t('footer.servicesList.study') }}</li>
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

      <div class="border-t border-white/10 mt-10 pt-8 text-center text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Cap Énergie (CAPENERGIE). {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
