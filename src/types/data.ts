// Types for all JSON data files used by the admin backoffice and frontend

export interface Project {
  id: string
  title: string
  country: string
  countryCode: string
  client: string
  clientType: string
  category: string
  description: string
  image: string
  galleryFolder?: string | null
}

export interface Founder {
  name: string
  role: string
  description: string
  image: string
}

export interface Partner {
  name: string
  logo: string
}

export interface MapPoint {
  country: string
  countryEn: string
  organizations: string[]
  svgX: number
  svgY: number
}

export interface MapData {
  viewBox: {
    minX: number
    minY: number
    width: number
    height: number
  }
  points: MapPoint[]
}

export interface Testimonial {
  key: string
  initials: string
  org: string
}

export interface BlogArticle {
  key: string
  tag: string
  color: string
}

export interface TrustBadge {
  key: string
  label: string
}

export interface DecisionBlock {
  key: string
  icon: string
}

export interface Differentiator {
  key: string
  icon: string
}

export interface HeroCounter {
  value: number
  duration: number
  prefix: string
  suffix: string
  labelKey: string
  unitKey?: string
}

export interface SiteSettings {
  companyName: string
  phone: string
  headquarters: string
  founded: number
  youtube: string
  heroImage: string
}
