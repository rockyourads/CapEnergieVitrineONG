<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { founders } from '@/data/founders'
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-dark text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">À propos de Cap Énergie</h1>
        <p class="text-lg text-gray-300 max-w-2xl">
          Depuis 2007, Cap Énergie accompagne les ONG et organisations humanitaires
          dans leurs projets d'électrification solaire.
        </p>
      </div>
    </section>

    <!-- Histoire -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">Notre histoire</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Fondée en 2007 à Montpellier, <strong class="text-dark">Cap Énergie (CAPENERGIE)</strong>
              est un distributeur photovoltaïque et concepteur de solutions off-grid.
            </p>
            <p>
              Avec plus de 25 ans d'expérience à l'export, notre équipe s'est spécialisée
              dans les marchés africains et asiatiques, où les besoins en électrification
              sont les plus critiques.
            </p>
            <p>
              Nous concevons des systèmes solaires autonomes adaptés aux conditions
              les plus exigeantes : centres médicaux isolés, villages sans réseau électrique,
              infrastructures humanitaires en zones de crise.
            </p>
            <p>
              Notre mission : fournir une énergie fiable et durable aux populations
              qui en ont le plus besoin, en partenariat avec les grandes ONG internationales.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fondateurs -->
    <section class="py-20 bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Les fondateurs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="founder in founders"
            :key="founder.name"
            class="bg-white rounded-xl p-6 text-center shadow-sm"
          >
            <div class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-primary">
                {{ founder.name.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>
            <h3 class="font-semibold text-lg">{{ founder.name }}</h3>
            <p class="text-sm text-primary font-medium mt-1">{{ founder.role }}</p>
            <p class="text-sm text-gray mt-3">{{ founder.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Zones d'intervention -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Zones d'intervention</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127757;</div>
            <h3 class="font-semibold">Afrique</h3>
            <p class="text-sm text-gray mt-1">Burkina Faso, Tchad, Niger...</p>
          </div>
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127759;</div>
            <h3 class="font-semibold">Asie</h3>
            <p class="text-sm text-gray mt-1">Philippines, Laos...</p>
          </div>
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127758;</div>
            <h3 class="font-semibold">Caraïbes</h3>
            <p class="text-sm text-gray mt-1">Dominique, Guyane...</p>
          </div>
          <div class="p-6 bg-light rounded-xl">
            <div class="text-3xl mb-2">&#127467;&#127479;</div>
            <h3 class="font-semibold">DOM-TOM</h3>
            <p class="text-sm text-gray mt-1">Guyane française...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-primary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Travaillons ensemble</h2>
        <p class="text-lg text-white/80 mb-8">
          Vous êtes une ONG avec un projet d'électrification ? Parlons-en.
        </p>
        <RouterLink
          to="/devis"
          class="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg text-lg hover:bg-gray-100 transition-colors"
        >
          Demander un devis
        </RouterLink>
      </div>
    </section>
  </div>
</template>
