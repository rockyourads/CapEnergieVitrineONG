import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Project,
  Founder,
  Partner,
  MapData,
  Testimonial,
  BlogArticle,
  TrustBadge,
  DecisionBlock,
  Differentiator,
  HeroCounter,
  SiteSettings,
} from '@/types/data'

const API = '/api/data'

async function loadJson<T>(filename: string): Promise<T> {
  const res = await fetch(`${API}/${filename}`)
  if (!res.ok) throw new Error(`Failed to load ${filename}`)
  return res.json()
}

async function saveJson(filename: string, data: unknown): Promise<void> {
  const res = await fetch(`${API}/${filename}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to save ${filename}`)
}

export const useAdminStore = defineStore('admin', () => {
  // UI state
  const sidebarCollapsed = ref(false)
  const saving = ref(false)
  const toast = ref<{ message: string; type: 'success' | 'error' } | null>(null)

  // Data
  const projects = ref<Project[]>([])
  const founders = ref<Founder[]>([])
  const partners = ref<Partner[]>([])
  const mapData = ref<MapData | null>(null)
  const testimonials = ref<Testimonial[]>([])
  const blogArticles = ref<BlogArticle[]>([])
  const trustBadges = ref<TrustBadge[]>([])
  const decisionBlocks = ref<DecisionBlock[]>([])
  const differentiators = ref<Differentiator[]>([])
  const heroCounters = ref<HeroCounter[]>([])
  const siteSettings = ref<SiteSettings | null>(null)
  const i18nFr = ref<Record<string, unknown>>({})
  const i18nEn = ref<Record<string, unknown>>({})

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    toast.value = { message, type }
    setTimeout(() => { toast.value = null }, 3000)
  }

  async function loadAll() {
    try {
      const results = await Promise.allSettled([
        loadJson<Project[]>('projects.json'),
        loadJson<Founder[]>('founders.json'),
        loadJson<Partner[]>('partners.json'),
        loadJson<MapData>('map-points.json'),
        loadJson<Testimonial[]>('testimonials.json'),
        loadJson<BlogArticle[]>('blog-articles.json'),
        loadJson<TrustBadge[]>('trust-badges.json'),
        loadJson<DecisionBlock[]>('decision-blocks.json'),
        loadJson<Differentiator[]>('differentiators.json'),
        loadJson<HeroCounter[]>('hero-counters.json'),
        loadJson<SiteSettings>('site-settings.json'),
        loadJson<Record<string, unknown>>('i18n/fr.json'),
        loadJson<Record<string, unknown>>('i18n/en.json'),
      ])

      if (results[0].status === 'fulfilled') projects.value = results[0].value
      if (results[1].status === 'fulfilled') founders.value = results[1].value
      if (results[2].status === 'fulfilled') partners.value = results[2].value
      if (results[3].status === 'fulfilled') mapData.value = results[3].value
      if (results[4].status === 'fulfilled') testimonials.value = results[4].value
      if (results[5].status === 'fulfilled') blogArticles.value = results[5].value
      if (results[6].status === 'fulfilled') trustBadges.value = results[6].value
      if (results[7].status === 'fulfilled') decisionBlocks.value = results[7].value
      if (results[8].status === 'fulfilled') differentiators.value = results[8].value
      if (results[9].status === 'fulfilled') heroCounters.value = results[9].value
      if (results[10].status === 'fulfilled') siteSettings.value = results[10].value
      if (results[11].status === 'fulfilled') i18nFr.value = results[11].value
      if (results[12].status === 'fulfilled') i18nEn.value = results[12].value
    } catch (e) {
      showToast('Erreur lors du chargement des données', 'error')
      console.error(e)
    }
  }

  async function saveData(filename: string, data: unknown) {
    saving.value = true
    try {
      await saveJson(filename, data)
      showToast('Sauvegardé avec succès')
    } catch {
      showToast('Erreur lors de la sauvegarde', 'error')
    } finally {
      saving.value = false
    }
  }

  async function saveProjects() { await saveData('projects.json', projects.value) }
  async function saveFounders() { await saveData('founders.json', founders.value) }
  async function savePartners() { await saveData('partners.json', partners.value) }
  async function saveMapData() { await saveData('map-points.json', mapData.value) }
  async function saveTestimonials() { await saveData('testimonials.json', testimonials.value) }
  async function saveBlogArticles() { await saveData('blog-articles.json', blogArticles.value) }
  async function saveTrustBadges() { await saveData('trust-badges.json', trustBadges.value) }
  async function saveDecisionBlocks() { await saveData('decision-blocks.json', decisionBlocks.value) }
  async function saveDifferentiators() { await saveData('differentiators.json', differentiators.value) }
  async function saveHeroCounters() { await saveData('hero-counters.json', heroCounters.value) }
  async function saveSiteSettings() { await saveData('site-settings.json', siteSettings.value) }
  async function saveI18nFr() { await saveData('i18n/fr.json', i18nFr.value) }
  async function saveI18nEn() { await saveData('i18n/en.json', i18nEn.value) }

  return {
    // UI
    sidebarCollapsed, saving, toast, showToast,
    // Data
    projects, founders, partners, mapData, testimonials,
    blogArticles, trustBadges, decisionBlocks, differentiators,
    heroCounters, siteSettings, i18nFr, i18nEn,
    // Actions
    loadAll,
    saveProjects, saveFounders, savePartners, saveMapData,
    saveTestimonials, saveBlogArticles, saveTrustBadges,
    saveDecisionBlocks, saveDifferentiators, saveHeroCounters,
    saveSiteSettings, saveI18nFr, saveI18nEn,
  }
})
