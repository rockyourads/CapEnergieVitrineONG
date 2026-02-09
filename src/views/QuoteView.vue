<script setup lang="ts">
import { ref, reactive } from 'vue'

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
  // Simuler l'envoi (à remplacer par EmailJS, Formspree, etc.)
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
        <h1 class="text-4xl font-bold mb-4">Demander un devis</h1>
        <p class="text-lg text-gray-300 max-w-2xl">
          Décrivez votre projet d'électrification solaire et notre équipe vous recontactera
          dans les plus brefs délais.
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
          <h2 class="text-2xl font-bold text-green-800 mb-2">Demande envoyée !</h2>
          <p class="text-green-600">
            Merci pour votre demande. Notre équipe vous recontactera dans les plus brefs délais.
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="organization" class="block text-sm font-medium text-dark mb-2">
                Nom de l'organisation / ONG *
              </label>
              <input
                id="organization"
                v-model="form.organization"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ex: Croix Rouge, MSF..."
              />
            </div>
            <div>
              <label for="contactName" class="block text-sm font-medium text-dark mb-2">
                Nom du contact *
              </label>
              <input
                id="contactName"
                v-model="form.contactName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Prénom Nom"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-dark mb-2">
                Email *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="contact@organisation.org"
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-dark mb-2">
                Téléphone
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+33 ..."
              />
            </div>
          </div>

          <div>
            <label for="country" class="block text-sm font-medium text-dark mb-2">
              Pays du projet *
            </label>
            <input
              id="country"
              v-model="form.country"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ex: Burkina Faso, Philippines..."
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-dark mb-2">
              Description du besoin *
            </label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              placeholder="Type d'installation, puissance estimée, nombre de sites..."
            ></textarea>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-dark mb-2">
              Message libre
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              placeholder="Informations complémentaires..."
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitting">Envoi en cours...</span>
            <span v-else>Envoyer la demande de devis</span>
          </button>

          <p class="text-xs text-gray text-center">
            En soumettant ce formulaire, vous acceptez d'être recontacté par Cap Énergie
            concernant votre demande.
          </p>
        </form>
      </div>
    </section>

    <!-- Contact info -->
    <section class="py-12 bg-light">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray">
          Vous pouvez aussi nous contacter directement au
          <a href="tel:+33467567791" class="text-primary font-medium hover:text-primary-dark">
            +33 (0)4 67 56 77 91
          </a>
        </p>
        <p class="text-sm text-gray mt-2">Siège : Montpellier, France</p>
      </div>
    </section>
  </div>
</template>
