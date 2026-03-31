<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { projects } from '@/data/projects'
import HeroSection from '@/components/HeroSection.vue'
import PartnerLogoBanner from '@/components/PartnerLogoBanner.vue'
import WorldMap from '@/components/WorldMap.vue'
import DecisionBlocks from '@/components/DecisionBlocks.vue'
import DifferentiatorsSection from '@/components/DifferentiatorsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import TrustSection from '@/components/TrustSection.vue'
import BlogPreviewSection from '@/components/BlogPreviewSection.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const router = useRouter()
const featuredProjects = projects.filter(p => p.galleryFolder).slice(0, 6)
const { elementRef: projectsRef, isVisible: projectsVisible } = useScrollReveal()

const manifest = ref<Record<string, string[]>>({})

onMounted(async () => {
  try {
    const res = await fetch('/images/esf/manifest.json')
    manifest.value = await res.json()
  } catch { /* ignore */ }
})

function getCoverImage(project: typeof projects[0]): string | null {
  if (project.galleryFolder) {
    const files = manifest.value[project.galleryFolder]
    if (files && files.length) return files[0] ?? null
  }
  return null
}

function getPhotoCount(project: typeof projects[0]): number {
  if (project.galleryFolder) {
    const files = manifest.value[project.galleryFolder]
    if (files) return files.length
  }
  return 0
}
</script>

<template>
  <div>
    <!-- 1. Hero plein écran -->
    <HeroSection />

    <!-- 2. Bandeau partenaires -->
    <PartnerLogoBanner />

    <!-- 3. Carte du monde interactive -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('map.title') }}</h2>
          <p class="text-gray max-w-2xl mx-auto text-lg">
            {{ t('map.subtitle') }}
          </p>
        </div>
        <WorldMap />
      </div>
    </section>

    <!-- 4. Blocs décisionnels ONG -->
    <DecisionBlocks />

    <!-- 5. Ce qui nous différencie -->
    <DifferentiatorsSection />

    <!-- 6. Témoignages -->
    <TestimonialsSection />

    <!-- 7. Confiance & certifications -->
    <TrustSection />

    <!-- 8. Projets en vedette (avec vraies photos) -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('featured.title') }}</h2>
          <p class="text-gray max-w-2xl mx-auto text-lg">
            {{ t('featured.subtitle') }}
          </p>
        </div>
        <div
          ref="projectsRef"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer reveal"
            :class="[projectsVisible && 'is-visible', `stagger-${Math.min(index + 1, 4)}`]"
            @click="router.push({ name: 'project-detail', params: { id: project.id } })"
          >
            <!-- Cover image -->
            <div class="h-52 bg-gradient-to-br from-primary/10 to-accent/5 relative overflow-hidden">
              <img
                v-if="getCoverImage(project)"
                :src="getCoverImage(project)!"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <svg v-else class="w-16 h-16 text-primary/20 absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Photo count badge -->
              <span
                v-if="getPhotoCount(project)"
                class="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm"
              >
                {{ getPhotoCount(project) }} photos
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {{ project.country }}
                </span>
                <span class="text-xs text-gray">{{ project.category }}</span>
              </div>
              <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{{ project.title }}</h3>
              <p class="text-sm text-gray leading-relaxed line-clamp-2">{{ project.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <RouterLink
            to="/projets"
            class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            {{ t('featured.viewAll') }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 9. Blog / Ressources -->
    <BlogPreviewSection />

    <!-- 10. CTA final -->
    <section class="py-24 bg-dark text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('cta.title') }}</h2>
        <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          {{ t('cta.subtitle') }}
        </p>
        <RouterLink
          to="/devis"
          class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-bold rounded-lg text-lg hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/25"
        >
          {{ t('cta.button') }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
