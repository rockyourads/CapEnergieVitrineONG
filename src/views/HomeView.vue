<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projects } from '@/data/projects'

const featuredProjects = projects.slice(0, 3)
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-dark text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            L'énergie solaire au service de
            <span class="text-primary">l'humanitaire</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Depuis 2007, Cap Énergie conçoit et installe des solutions photovoltaïques
            pour les ONG et organisations humanitaires en Afrique, Asie et dans les Caraïbes.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink
              to="/devis"
              class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Demander un devis
            </RouterLink>
            <RouterLink
              to="/projets"
              class="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Voir nos réalisations
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Chiffres clés -->
    <section class="py-16 bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl md:text-4xl font-extrabold text-primary">+25</div>
            <div class="text-sm text-gray mt-1">Années d'expérience</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-extrabold text-primary">2007</div>
            <div class="text-sm text-gray mt-1">Création de Cap Énergie</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-extrabold text-primary">+15</div>
            <div class="text-sm text-gray mt-1">Pays d'intervention</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-extrabold text-primary">100%</div>
            <div class="text-sm text-gray mt-1">Énergie renouvelable</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Valeurs -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Construire sur la confiance</h3>
            <p class="text-gray">Des partenariats durables avec les ONG, basés sur la transparence et la fiabilité.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Une équipe pleinement investie</h3>
            <p class="text-gray">Des experts passionnés qui s'engagent pleinement dans chaque projet humanitaire.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Agir avec sens</h3>
            <p class="text-gray">Chaque installation apporte une réponse concrète aux besoins énergétiques des populations vulnérables.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projets en vedette -->
    <section class="py-20 bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Nos réalisations</h2>
          <p class="text-gray max-w-2xl mx-auto">
            Découvrez nos installations photovoltaïques réalisées pour des ONG à travers le monde.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <svg class="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {{ project.country }}
                </span>
                <span class="text-xs text-gray">{{ project.category }}</span>
              </div>
              <h3 class="font-semibold text-lg mb-2">{{ project.title }}</h3>
              <p class="text-sm text-gray line-clamp-2">{{ project.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <RouterLink
            to="/projets"
            class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voir tous les projets
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-dark text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Un projet d'électrification solaire ?</h2>
        <p class="text-lg text-gray-300 mb-8">
          Contactez-nous pour étudier ensemble votre projet photovoltaïque ONG.
          Notre équipe vous accompagne de la conception à l'installation.
        </p>
        <RouterLink
          to="/devis"
          class="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg text-lg hover:bg-primary-dark transition-colors"
        >
          Demander un devis gratuit
        </RouterLink>
      </div>
    </section>
  </div>
</template>
