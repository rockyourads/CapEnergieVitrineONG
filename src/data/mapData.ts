export interface MapPoint {
  country: string
  countryEn: string
  organizations: string[]
  // SVG coordinates (from getBBox center of each country path in world-map.svg)
  svgX: number
  svgY: number
}

// viewBox of world-map.svg: "30.767 241.591 784.077 458.627"
// => x: 30.767 to 814.844, y: 241.591 to 700.218
export const SVG_VIEWBOX = { minX: 30.767, minY: 241.591, width: 784.077, height: 458.627 }

export const mapPoints: MapPoint[] = [
  {
    country: 'Philippines',
    countryEn: 'Philippines',
    svgX: 704.2,
    svgY: 494.1,
    organizations: ['Croix Rouge'],
  },
  {
    country: 'Laos',
    countryEn: 'Laos',
    svgX: 656.4,
    svgY: 478.6,
    organizations: ['ONG locale'],
  },
  {
    country: 'Dominique',
    countryEn: 'Dominica',
    svgX: 256.5,
    svgY: 486.8,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Burkina Faso',
    countryEn: 'Burkina Faso',
    svgX: 403.5,
    svgY: 499.7,
    organizations: ['Société Générale'],
  },
  {
    country: 'Tchad',
    countryEn: 'Chad',
    svgX: 451.4,
    svgY: 492.3,
    organizations: ['Infrastructure aéroportuaire'],
  },
  {
    country: 'Kenya',
    countryEn: 'Kenya',
    svgX: 499.6,
    svgY: 530,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Madagascar',
    countryEn: 'Madagascar',
    svgX: 520.8,
    svgY: 579.2,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Djibouti',
    countryEn: 'Djibouti',
    svgX: 510.2,
    svgY: 500.1,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Sierra Leone',
    countryEn: 'Sierra Leone',
    svgX: 377,
    svgY: 510.7,
    organizations: ['LASER'],
  },
  {
    country: 'Sénégal',
    countryEn: 'Senegal',
    svgX: 372.5,
    svgY: 495.4,
    organizations: ['Électriciens Sans Frontières'],
  },
  {
    country: 'Niger',
    countryEn: 'Niger',
    svgX: 427,
    svgY: 485.9,
    organizations: ['MSF'],
  },
  {
    country: 'Guyane',
    countryEn: 'French Guiana',
    // French Guiana is just east of Guyana (263.3, 520.1)
    svgX: 268,
    svgY: 518,
    organizations: ['Électriciens Sans Frontières'],
  },
]
