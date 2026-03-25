<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  organization: '',
  contactName: '',
  email: '',
  phone: '',
  country: '',
  description: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  submitted.value = true
  submitting.value = false
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-dark text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">{{ t('quotePage.title') }}</h1>
        <p class="text-lg text-gray-300 max-w-2xl">
          {{ t('quotePage.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Form -->
    <section class="py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Success message -->
        <div v-if="submitted" class="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-green-800 mb-2">{{ t('quotePage.successTitle') }}</h2>
          <p class="text-green-600">
            {{ t('quotePage.successMessage') }}
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="organization" class="block text-sm font-medium text-dark mb-2">
                {{ t('quotePage.organization') }} *
              </label>
              <input
                id="organization"
                v-model="form.organization"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="t('quotePage.organizationPlaceholder')"
              />
            </div>
            <div>
              <label for="contactName" class="block text-sm font-medium text-dark mb-2">
                {{ t('quotePage.contactName') }} *
              </label>
              <input
                id="contactName"
                v-model="form.contactName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="t('quotePage.contactNamePlaceholder')"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-dark mb-2">
                {{ t('quotePage.email') }} *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="t('quotePage.emailPlaceholder')"
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-dark mb-2">
                {{ t('quotePage.phone') }}
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="t('quotePage.phonePlaceholder')"
              />
            </div>
          </div>

          <div>
            <label for="country" class="block text-sm font-medium text-dark mb-2">
              {{ t('quotePage.country') }} *
            </label>
            <input
              id="country"
              v-model="form.country"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :placeholder="t('quotePage.countryPlaceholder')"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-dark mb-2">
              {{ t('quotePage.description') }} *
            </label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              :placeholder="t('quotePage.descriptionPlaceholder')"
            ></textarea>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-dark mb-2">
              {{ t('quotePage.message') }}
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              :placeholder="t('quotePage.messagePlaceholder')"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitting">{{ t('quotePage.submitting') }}</span>
            <span v-else>{{ t('quotePage.submit') }}</span>
          </button>

          <p class="text-xs text-gray text-center">
            {{ t('quotePage.disclaimer') }}
          </p>
        </form>
      </div>
    </section>

    <!-- Contact info -->
    <section class="py-12 bg-light">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray">
          {{ t('quotePage.contactDirect') }}
          <a href="tel:+33467567791" class="text-primary font-medium hover:text-primary-dark">
            +33 (0)4 67 56 77 91
          </a>
        </p>
        <p class="text-sm text-gray mt-2">{{ t('quotePage.hq') }}</p>
      </div>
    </section>
  </div>
</template>
