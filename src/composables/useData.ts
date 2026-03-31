import { ref, readonly } from 'vue'
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

const base = import.meta.env.BASE_URL

// Shared cache across all component instances
const cache = new Map<string, unknown>()

async function fetchJson<T>(filename: string): Promise<T> {
  if (cache.has(filename)) return cache.get(filename) as T
  const res = await fetch(`${base}data/${filename}`)
  if (!res.ok) throw new Error(`Failed to load ${filename}: ${res.status}`)
  const data = await res.json()
  cache.set(filename, data)
  return data as T
}

/** Invalidate cache for a specific file or all files */
export function invalidateCache(filename?: string) {
  if (filename) cache.delete(filename)
  else cache.clear()
}

// --- Individual data loaders ---

export function useProjects() {
  const projects = ref<Project[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  fetchJson<Project[]>('projects.json')
    .then(data => { projects.value = data })
    .catch(e => { error.value = e.message })
    .finally(() => { loading.value = false })

  return { projects: readonly(projects), loading: readonly(loading), error: readonly(error), refetch: () => {
    invalidateCache('projects.json')
    loading.value = true
    fetchJson<Project[]>('projects.json')
      .then(data => { projects.value = data })
      .catch(e => { error.value = e.message })
      .finally(() => { loading.value = false })
  }}
}

export function useFounders() {
  const founders = ref<Founder[]>([])
  const loading = ref(true)

  fetchJson<Founder[]>('founders.json')
    .then(data => { founders.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { founders: readonly(founders), loading: readonly(loading) }
}

export function usePartners() {
  const partners = ref<Partner[]>([])
  const loading = ref(true)

  fetchJson<Partner[]>('partners.json')
    .then(data => { partners.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { partners: readonly(partners), loading: readonly(loading) }
}

export function useMapData() {
  const mapData = ref<MapData | null>(null)
  const loading = ref(true)

  fetchJson<MapData>('map-points.json')
    .then(data => { mapData.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { mapData: readonly(mapData), loading: readonly(loading) }
}

export function useTestimonials() {
  const testimonials = ref<Testimonial[]>([])
  const loading = ref(true)

  fetchJson<Testimonial[]>('testimonials.json')
    .then(data => { testimonials.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { testimonials: readonly(testimonials), loading: readonly(loading) }
}

export function useBlogArticles() {
  const articles = ref<BlogArticle[]>([])
  const loading = ref(true)

  fetchJson<BlogArticle[]>('blog-articles.json')
    .then(data => { articles.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { articles: readonly(articles), loading: readonly(loading) }
}

export function useTrustBadges() {
  const badges = ref<TrustBadge[]>([])
  const loading = ref(true)

  fetchJson<TrustBadge[]>('trust-badges.json')
    .then(data => { badges.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { badges: readonly(badges), loading: readonly(loading) }
}

export function useDecisionBlocks() {
  const blocks = ref<DecisionBlock[]>([])
  const loading = ref(true)

  fetchJson<DecisionBlock[]>('decision-blocks.json')
    .then(data => { blocks.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { blocks: readonly(blocks), loading: readonly(loading) }
}

export function useDifferentiators() {
  const differentiators = ref<Differentiator[]>([])
  const loading = ref(true)

  fetchJson<Differentiator[]>('differentiators.json')
    .then(data => { differentiators.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { differentiators: readonly(differentiators), loading: readonly(loading) }
}

export function useHeroCounters() {
  const counters = ref<HeroCounter[]>([])
  const loading = ref(true)

  fetchJson<HeroCounter[]>('hero-counters.json')
    .then(data => { counters.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { counters: readonly(counters), loading: readonly(loading) }
}

export function useSiteSettings() {
  const settings = ref<SiteSettings | null>(null)
  const loading = ref(true)

  fetchJson<SiteSettings>('site-settings.json')
    .then(data => { settings.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { settings: readonly(settings), loading: readonly(loading) }
}

export function useManifest() {
  const manifest = ref<Record<string, string[]>>({})
  const loading = ref(true)

  fetch(`${base}images/esf/manifest.json`)
    .then(res => res.json())
    .then(data => { manifest.value = data })
    .catch(() => {})
    .finally(() => { loading.value = false })

  return { manifest: readonly(manifest), loading: readonly(loading) }
}
